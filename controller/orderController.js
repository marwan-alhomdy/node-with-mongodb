const express = require('express');
const mongodb = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/node_leaarn";
const { ObjectId } = require('mongodb');



const addOrder = async (req, res) => {
    let client;
    try {
        const { name, total } = req.body;
        client = await mongodb.connect(url);
        const db = client.db();
        const collection = db.collection("orders");
        const result = await collection.insertOne({ name: name, total: total });
        res.status(200).json({ message: "Data added to MongoDB" });
    } catch (error) {
        res.status(401).json({ message: "Error connecting to MongoDB" });
    } finally {
        if (client && client.topology && client.topology.isConnected()) {
            client.close();
        }

    }
};


const getOrders = async (req, res) => {
    let client;
    try {
        client = await mongodb.connect(url);
        const db = client.db();
        const collection = db.collection("orders");
        const orders = await collection.find().toArray();
        res.status(200).json(orders);
    } catch (error) {
        res.status(401).json({ message: "Error connecting to MongoDB" });
    } finally {
        if (client && client.topology && client.topology.isConnected()) {
            client.close();
        }
    }
};

const getOrder = async (req, res) => {

    let client;
    const id = req.body.id;
    try {
        client = await mongodb.connect(url);
        const db = client.db();
        const collection = db.collection("orders");
        const orders = await collection.find({ _id: new ObjectId(id) }).toArray();
        res.status(200).json(orders);
    } catch (error) {
        res.status(401).json({ message: "Error connecting to MongoDB" });
    } finally {
        if (client && client.topology && client.topology.isConnected()) {
            client.close();
        }
    }

};



const deleteOrder = async (req, res) => {
    let client;
    try {
        const id = req.body.id;
        client = await mongodb.connect(url);
        const db = client.db();
        const collection = db.collection("orders");
        const result = await collection.deleteMany({ _id: new ObjectId(id) });
        res.status(200).json({ message: `${result.deletedCount} orders deleted successfully` });
    } catch (error) {
        res.status(401).json({ message: "Error connecting to MongoDB" });
    } finally {
        if (client && client.topology && client.topology.isConnected()) {
            client.close();
        }
    }
};


const updateOrder = async (req, res) => {
    let client;
    try {
        const { id, name, total } = req.body;
        client = await mongodb.connect(url);
        const db = client.db();
        const collection = db.collection("orders");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: name, total: total } }
        );
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Order updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(401).json({ message: "Error connecting to MongoDB" });
    } finally {
        if (client && client.topology && client.topology.isConnected()) {
            client.close();
        }
    }
};



module.exports = { addOrder, getOrder, getOrders, updateOrder, deleteOrder };