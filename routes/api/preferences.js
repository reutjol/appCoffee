var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//preferences model
const Preferences = require('./model/Preferences_model');
const Item = require('./model/Item_model');
const Milk = require('./model/Milk_model');

// Function to fetch available preference options
async function getPreferenceOptions() {
    try {
        // Fetch all items and milk types from the database
        const items = await Item.find();
        const milks = await Milk.find();

        // Return the fetched options
        return { items, milks };
    } catch (error) {
        console.error('Error fetching preference options:', error);
        throw error;
    }
}


// add preferences for a user
async function addPreferences(userId, items, milk, isFav, price, size) {
    try {
        // Create a new preferences object
        const newPreferences = new Preferences({
            user: userId,
            items: items,
            milk: milk,
            is_fav: isFav,
            price: price,
            size: size
        });
        
        // Save the preferences to the database
        const preferences = await newPreferences.save();
        return preferences;
    } catch (error) {
        console.error('Error adding preferences:', error);
        throw error;
    }
}
