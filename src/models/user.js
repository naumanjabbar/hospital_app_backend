import Model from '../lib/Mongoose/model';
import DB_COLLECTIONS from '../constants/dbCollections';
import { String, Mixed } from '../lib/Mongoose/constants';
import { USER_ROLES } from '../constants/users';

const userSchema = {
	email: {
		type: String,
		// unique: true,
	},
	phoneNumber: {
		type: String,
	},
    details: {
        type: Mixed,
    },
	password: {
		type: String,
	},
    role: {
        type: String,
		enum: Object.values(USER_ROLES),
    },
	verificationToken: {
		type: String,
	},
	verified: {
		type: Boolean,
	}
};

const UserModel = new Model(DB_COLLECTIONS.users, userSchema);

export default UserModel;
