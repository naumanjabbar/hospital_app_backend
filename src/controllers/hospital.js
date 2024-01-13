import DoctorModel from "../models/doctor";

export async function addDoctor(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Missing required fields', success: false });
        const reqBody = req.body;

        const newDoctor = await DoctorModel.insertOne({
            ...reqBody,
        });

        res.status(201).json({ message: 'Doctor added successfully', success: true, data: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
