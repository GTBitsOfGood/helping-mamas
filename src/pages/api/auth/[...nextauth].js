import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient, ObjectId } from "mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../../server/mongodb/index";
import User from "../../../../server/mongodb/models/User";

const uri = process.env.MONGO_DB;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  events: {
    createUser: async (message) => {
      await dbConnect();

      const _id = new ObjectId(message.user.id);

      await User.deleteOne({ _id });

      const userData = {
        _id,
        bio: {
          first_name: message.user.name.split(" ")[0],
          last_name: message.user.name.split(" ")[1],
          phone_number: "",
          email: message.user.email,
        },
      };

      const user = new User(userData);

      await user.save();
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      await dbConnect();

      const _id = new ObjectId(user.id);
      const currentUser = await User.findOne({ _id });

      return {
        ...session,
        user: currentUser,
      };
    },
  },
});
