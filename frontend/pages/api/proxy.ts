
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { model_owner, model_name} = req.query;
        console.log(model_owner)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": '**',
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        }

        const options = {
            headers,
        }

        const response = await fetch(`https://api.replicate.com/v1/models/${model_owner}/${model_name}`, options);
      

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

