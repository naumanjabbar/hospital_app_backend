import bcrypt from 'bcrypt';
import _ from 'lodash';
import fs from 'fs';

import UserModel from "../models/user";
import { generateToken, sendVerificationEmail } from '../utils/sendVerificationEmail';
import { createSecretToken } from '../utils/createSecterToken';
import { ObjectId } from '../lib/Mongoose/constants';

export async function registerUser(req, res) {
    try {
        const { email, password, type } = req.body;
        const reqBody = req.body;

        // console.log("req", reqBody)

        const existingUser = await UserModel.findOne({ filter: { email } });

        // if (existingUser) {
        //     return res.status(400).json({ message: 'User with this email already exists', success: false });
        // }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const verificationToken = generateToken();

        const newUser = await UserModel.insertOne({
            email,
            password: hashedPassword,
            role: type,
            verificationToken,
            details: {
                ...(_.omit(reqBody, ['email', 'password', 'role', 'type']) || {})
            }
        });

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: 'User registered successfully', success: true, data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ filter: { email } });

        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        const token = await createSecretToken(existingUser._id);
        // console.log("token", token)

        res.status(200).json({ message: 'Login successful', success: true, data: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export async function verifyToken(req, res) {
    try {
        const { token } = req.body;

        const user = await UserModel.findOne({ filter: { verificationToken: token } });

        if (!user) {
            return res.status(404).json({ message: 'Invalid token', success: false });
        }

        user.verified = true;
        user.verificationToken = undefined;
        await UserModel.updateOne({
            filter: {
                verificationToken: token
            },
            write: {
                verified: true,
            }
        })

        res.status(200).json({ message: 'Account verified successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function updateUser(req, res) {
    try {

        const { email, updatedFields } = req.body;

        const updatedUser = await UserModel.updateOne({
            filter: {
                email,
            },
            write: {
                details: { ...(updatedFields || {}) }
            }
        })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'User updated successfully', success: true, data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function getUser(req, res) {
    try {
        const { filter, limit, skip, sort } = req.body;

        if (filter?._id) filter._id = new ObjectId(_id);

        const user = await UserModel.find({
            filter: { ...(filter) },
            ...(limit && limit),
            ...(skip && skip),
            ...(sort && sort)
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'User retrieved successfully', success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function uploadFiles(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { originalname } = req.file;
        const { email } = req.body;

        const updatedUser = await UserModel.updateOne({
            filter: { email },
            write: {
                $push: {
                    'details.uploadDocuments': { fileName: originalname }
                }
            }
        })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'User updated successfully', success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function uploadMultipleFiles(req, res) {
    try {
        if (!req.files) {
            return res.status(400).json({ message: "No file uploaded" });
        }


        const files = req.files;
        const originalnames = _.map(files, 'originalname');
        const { email } = req.body;

        const updatedUser = await UserModel.updateOne({
            filter: { email },
            write: {
                $push: {
                    'details.uploadDocuments': { $each: originalnames.map(fileName => ({ fileName })) }
                }
            }
        })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'User updated successfully', success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteFiles(req, res) {
    try {
        const { email, name } = req.body;

        const filePath = `uploads/${name}`
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
            } else {
                console.log(`File ${filePath} removed successfully`);
            }
        });

        const updatedUser = await UserModel.updateOne({
            filter: { email },
            write: {
                $pull: {
                    'details.uploadDocuments': { fileName: name }
                }
            }
        })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'User updated successfully', success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}