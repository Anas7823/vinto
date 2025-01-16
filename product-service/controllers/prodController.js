const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Produit = require("../models/prodModel");

dotenv.config();

// nouvelle Produit
const newPub = async (req, res) => {
  try {
    // définir le nom de l'owner avec son token
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le token
    req.body.author = decoded.id; // Ajouter l'id de l'auteur au body
    const pub = new Produit(req.body);
    await pub.save();
    res.status(201).send(pub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir toutes les Produits
const getAllPub = async (req, res) => {
  try {
    const pubs = await Produit.find();
    res.status(200).send(pubs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir une Produit par son id
const getPubById = async (req, res) => {
  try {
    const pub = await Produit.findById(req.params.id);
    res.status(200).send(pub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Modifier une Produit en étant connecté en tant qu'auteur
const updatePub = async (req, res) => {
  try {
    // Récupérer le token et vérifier l'utilisateur
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token
    const userId = decoded.id; // Récupérer l'ID de l'utilisateur connecté

    // Trouver la Produit
    const pub = await Produit.findById(req.params.id);
    if (!pub) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Vérifier que l'utilisateur est bien l'auteur de la Produit
    if (pub.author.toString() !== userId) {
      return res.status(403).send({ error: "Forbidden: You are not the author of this Produit" });
    }

    // Mettre à jour la Produit
    const updatedPub = await Produit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).send(updatedPub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Supprimer une Produit en étant connecté en tant qu'auteur
const deletePub = async (req, res) => {
  try {
    // Récupérer le token et vérifier l'utilisateur
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token
    const userId = decoded.id; // Récupérer l'ID de l'utilisateur connecté

    // Trouver la Produit
    const pub = await Produit.findByIdAndDelete(req.params.id);
    if (!pub) {
      return res.status(400).send({ error: "Produit not found" });
    }

    // Vérifier que l'utilisateur est bien l'auteur de la Produit
    if (pub.author.toString() !== userId) {
      return res.status(403).send({ error: "Forbidden: You are not the author of this produit" });
    }
    res.status(200).send("Produit supprimé");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { newPub, getAllPub, getPubById, updatePub, deletePub };