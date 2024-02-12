const asyncHandler = require("express-async-handler")
const UsersModel = require("../models/usersModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Users = require("../models/usersModel");
const {join} = require("path");

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})

const createUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, poste, email, password, is_admin } = req.body;

    const profileImage = req.files && req.files.profileImage;

    let path

    if (!profileImage)
    {
        path = null
    }

    if (profileImage)
    {
        path = profileImage.name.replace(/\s/g, "")

        const uploadPath = join(__dirname, "..", "..", "frontend", "public", "uploads", path);

        await profileImage.mv(uploadPath, (err) => {
            if (err) {
                res.status(400).json({message: "Erreur lors de la création du fichier"});
            }
        });
    }

    if (!first_name || !last_name || !poste || !email || !password) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    const user = await Users.findOne({ email});

    if (user) {
        res.status(400).json({ message: "Un utilisateur avec le même email existe déjà !" });
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await Users.create({
        first_name,
        last_name,
        poste,
        email,
        password: hashedPassword,
        is_admin,
        profileImage: path
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            poste: newUser.poste,
            email: newUser.email,
            is_admin: newUser.is_admin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400).json({ message: "Erreur lors de la création de l'utilisateur, veuillez réessayer." });
    }
});



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await UsersModel.findOne({email})

    //Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            poste: user.poste,
            email: user.email,
            is_admin: user.is_admin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({message: "Mot de passe ou nom d'utilisateur erroné."})
    }
})

// @desc    Check a user
// @route   POST /api/users/login
// @access  Public
const checkUser = asyncHandler(async (req, res) => {
    const {email} = req.body

    //Check for user email
    const user = await UsersModel.findOne({email})

    if (user) {
        res.status(200).json()
        return true
    }

    else
    {
        res.status(400).json({message: "Utilisateur introuvable"})
    }

})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    const { _id, first_name, last_name, email } = await UsersModel.findById(req.user.id) // ID vient du token
    res.status(200).json({
        _id,
        first_name,
        last_name,
        email
    })
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getSpecificUser = asyncHandler(async (req, res) => {
    const user = await UsersModel.findById(req.params.id) // ID vient du token
    res.status(200).json({user})
})


// @desc    Get user data
// @route   DELETE /api/delete/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)

    if (!user) {
        return res.status(400).json({message: "Utilisateur introuvable."});
    }

    if (!req.user) {
        return res.status(400).json({message: "Veuillez vous connecter."});
    }

    await Users.findByIdAndRemove(req.params.id)

    return res.status(200).json({id: req.params.id});
});

// @desc Update option
// @route PUT /api/options/edit/:id
// Access Private
const updateUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, poste, email, password, is_admin } = req.body;

    if (!first_name || !last_name || !poste || !email || !password) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    const user = await Users.findById(req.params.id)

    if (!user) {
        res.status(400).json({message: "Utilisateur non trouvé."})
    }

    if (!req.user.is_admin) {
        res.status(400).json({message: "Vous n'avez pas la permission."})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let data = {
        first_name: first_name,
        last_name: last_name,
        poste: poste,
        email: email,
        password: hashedPassword,
        is_admin: is_admin,
    }

    await Users.findByIdAndUpdate(req.params.id, data, {new: true})

    res.status(200).json({
        first_name: first_name,
        last_name: last_name,
        poste: poste,
        email: email,
        is_admin: is_admin,
        token: generateToken(user._id)})
})

//  Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    } )
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    checkUser,
    getAllUsers,
    deleteUser,
    getSpecificUser,
    updateUser
}