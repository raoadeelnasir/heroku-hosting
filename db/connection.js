import mongooose from "mongoose";
export const databaseConnection = async (request, response) => {
  try {
    await mongooose.connect(
      "mongodb+srv://cooltigers:cooltigers@cluster0.vgc1d.mongodb.net/test"
      );
      console.log("Database is connected")
  } catch (error) {
    console.log(`error on connecting to database ${error}`);
  }
};
