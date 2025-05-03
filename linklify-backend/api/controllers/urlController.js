// shortUrlController.js (o el nombre que prefieras)
import fetch from 'node-fetch';
import 'dotenv/config';
import { db } from '../database/connection.js'; // Asegúrate de que la ruta sea correcta
import { v4 as uuidv4 } from 'uuid';

const TURSO_DB_URL = process.env.TURSO_DB_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

async function executeQuery(sql, args = []) {
    try {
        if (!TURSO_DB_URL || !TURSO_AUTH_TOKEN) {
            console.error('Error: Las variables de entorno TURSO_DB_URL o TURSO_AUTH_TOKEN no están configuradas.');
            throw new Error('Configuración de Turso incompleta.');
        }

        const response = await fetch(`${TURSO_DB_URL}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TURSO_AUTH_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql, args }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al ejecutar la consulta:', error);
            throw new Error(`Turso API error: ${response.status} - ${JSON.stringify(error)}`);
        }

        const data = await response.json();
        return data?.result || [];
    } catch (error) {
        console.error('Error en executeQuery:', error);
        throw error;
    }
}

const findOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const result = await db.execute({
            sql: 'SELECT original_url FROM short_urls WHERE short_code = ?',
            args: [shortCode]
        });

        if (!result.rows.length) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.json({ original_url: result.rows[0].original_url });
    } catch (error) {
        console.error('Error finding original URL:', error);
        res.status(500).json({ error: error.message });
    }
};



const shortenUrl = async (req, res) => {
    try {
        const { original_url } = req.body;

        if (!original_url) {
            return res.status(400).json({ error: 'Original URL is required' });
        }

        const short_code = uuidv4().slice(0, 10); // Genera un código corto único (8 caracteres)
        const now = new Date();
        const expires_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 días

        await db.execute({
            sql: 'INSERT INTO short_urls (short_code, original_url, expires_at) VALUES (?, ?, ?)',
            args: [short_code, original_url, expires_at.toISOString()]
        });

        const newUrl = await db.execute({
            sql: 'SELECT short_code FROM short_urls WHERE short_code = ?',
            args: [short_code]
        });

        res.status(201).json(newUrl.rows[0]);
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: error.message });
    }
};


const healthCheck = async (req, res) => {
    try {
         
        res.json({ message: 'Test endpoint is working!' });
    } catch (error) {
        console.error('Error in test:', error);
        res.status(500).json({ error: error.message });
    }
};



export { findOriginalUrl, shortenUrl, healthCheck };