import * as aboutUsModel from '../model/aboutus.js';
import {pool} from '../database/database.js';

export const getText = async (req, res) => {
    try {
        const aboutUs = await aboutUsModel.getAboutUs(pool);
        res.status(200).json(aboutUs);
    } catch (e) {
        console.error('Error getting the text',e);
        res.status(500).json({message: 'Internal server error' });
    }
}


export const updateText = async (req, res) => {
    try {
        console.log(req.body.content);
        const aboutUs = await aboutUsModel.updateAboutUs(pool, {content:req.body.content});
        res.status(200).json(aboutUs);
    } catch (e) {
        console.error('Error updating the text',e);
        res.status(500).json({message: 'Internal server error admin update text about' });
    }
}
