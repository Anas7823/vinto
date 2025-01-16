const dotenv = require("dotenv");
const News = require("../models/newsModel");

dotenv.config();

// nouvelle News
const newNews = async (req, res) => {
  try {
    req.body.author = decoded.id; // Ajouter l'id de l'auteur au body
    const news = new News(req.body);
    await news.save();
    res.status(201).send(pub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir toutes les News
const getAllNews = async (req, res) => {
  try {
    const pubs = await News.find();
    res.status(200).send(pubs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir une News par son id
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).send(news);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Modifier une news en étant connecté en tant qu'auteur
const updateNews = async (req, res) => {
  try {
    // Récupérer le token et vérifier l'utilisateur
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    // Trouver la news
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).send({ error: "News not found" });
    }

    // Mettre à jour la news
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).send(updatedNews);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Supprimer une news en étant connecté en tant qu'auteur
const deleteNews = async (req, res) => {
  try {
    // Trouver la news
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(400).send({ error: "News not found" });
    }

    // Vérifier que l'utilisateur est bien l'auteur de la news
    if (news.author.toString() !== userId) {
      return res.status(403).send({ error: "Forbidden: You are not the author of this news" });
    }
    res.status(200).send("News supprimé");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { newNews, getAllNews, getNewsById, updateNews, deleteNews };