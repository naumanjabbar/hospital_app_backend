import Model from '../lib/Mongoose/model';
import DB_COLLECTIONS from '../constants/dbCollections';
import { String, Mixed } from '../lib/Mongoose/constants';
import { USER_ROLES } from '../constants/users';

const doctorSchema = {
  fullName: {
    type: String,
  },
  email: {
    type: String,
    // unique: true,
  },
  password: {
    type: String,
  },
  specialization: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  license: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  hospitalName: {
    type: String,
  },
  department: {
    type: String,
  },
  workingHours: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  languages: {
    type: String,
  },
  insuranceInfo: {
    type: String,
  },
  emergencyContact: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  role: {
    type: String,
    // enum: Object.values(USER_ROLES),
  },
};

const DoctorModel = new Model(DB_COLLECTIONS.doctors, doctorSchema);

export default DoctorModel;
