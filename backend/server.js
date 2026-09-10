
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Prisma ko import kiya

const app = express();
const prisma = new PrismaClient(); // Prisma ka connection on kiya

const cors = require('cors');
app.use(cors()); // Isko app.use(express.json()) ke theek upar ya neeche likhein

app.use(express.json()); 

// ==========================================
// STEP 2.9: CORE BACKEND APIs
// ==========================================

// 1. Health API (Server check karne ke liye)
app.get('/api/health', (req, res) => {
    res.json({ status: '✅ Server is running perfectly!', database: 'Connected' });
});

// Create User API (Naya User banane ke liye)
app.post('/api/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: { 
                email: 'admin@globalos.com', 
                name: 'Kundan' 
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// 2. Create Workspace API
app.post('/api/workspaces', async (req, res) => {
    try {
        const { name, description, owner_id } = req.body;
        const workspace = await prisma.workspace.create({
            data: { name, description, owner_id }
        });
        res.status(201).json(workspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create workspace' });
    }
});

// 3. Get All Workspaces API
app.get('/api/workspaces', async (req, res) => {
    try {
        const workspaces = await prisma.workspace.findMany();
        res.json(workspaces);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workspaces' });
    }
});

// 4. Create Dataset Metadata API
app.post('/api/datasets', async (req, res) => {
    try {
        const { workspace_id, name, description, format } = req.body;
        const dataset = await prisma.dataset.create({
            data: { workspace_id, name, description, format }
        });
        res.status(201).json(dataset);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create dataset' });
    }
});

// 5. Get All Datasets API
app.get('/api/datasets', async (req, res) => {
    try {
        const datasets = await prisma.dataset.findMany();
        res.json(datasets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch datasets' });
    }
});

// ==========================================
// SERVER START
// ==========================================
const PORT = process.env.PORT || 5000; // Step 2.3 ke hisaab se Port 5000 set kiya
app.listen(PORT, () => {
    console.log(`🚀 Global Intelligence OS Backend running on http://localhost:${PORT}`);
});