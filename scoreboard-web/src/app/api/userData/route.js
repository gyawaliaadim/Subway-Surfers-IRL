"use server"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import { v4 as uuidv4 } from 'uuid';
export async function POST(req){
    try {
        const body=  await req.json()
        const { name, age, photo } = body;
        
        // Validate required fields
        if (!name || age === undefined || age === null) {
            return new Response(JSON.stringify({ error: "Missing required fields: name, age" }), { status: 400 });
        }
        
        await connectDb()
        const newUserData = {}
        newUserData.id = uuidv4();
        newUserData.name = name;
        newUserData.age = age;
        if (photo) {
          // Accept data URL ("data:image/png;base64,...") or raw base64
          if (typeof photo === "string" && photo.startsWith("data:")) {
            const base64 = photo.split(",")[1];
            newUserData.photo = Buffer.from(base64, "base64");
          } else if (typeof photo === "string") {
            // assume base64 without prefix
            newUserData.photo = Buffer.from(photo, "base64");
          } else {
            newUserData.photo = photo;
          }
        }
        // Check if user with this id already exists
        const newUser = new User(newUserData);
        await newUser.save();

        return new Response(JSON.stringify({ id: newUserData.id }), { status: 200 });
    } catch (err) {
        console.error("Error creating user:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }

}

// "use server" not needed in API routes, but if using Next.js 14+ server actions, keep it

// GET all users
export async function GET() {
  try {
    await connectDb();
    // Sort by score descending
    const users = await User.find({}).sort({ score: -1 });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


// DELETE a user by id
export async function DELETE(req) {
  try {
    
    const body=  await req.json()
    const {id} = body;
    if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });

    await connectDb();
    const deletedUser = await User.findOneAndDelete({ id });
    if (!deletedUser) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT (update) a user by id
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, age, score, photo } = body;
    console.log(id, name, age, score);
    if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
  const updatedData = {};

    if (name !== undefined) updatedData.name = name;
    if (age !== undefined) updatedData.age = age;
    if (score !== undefined) updatedData.score = score;
    if (photo !== undefined && photo !== null) {
      if (typeof photo === "string" && photo.startsWith("data:")) {
        const base64 = photo.split(",")[1];
        updatedData.photo = Buffer.from(base64, "base64");
      } else if (typeof photo === "string") {
        updatedData.photo = Buffer.from(photo, "base64");
      } else {
        updatedData.photo = photo;
      }
    }
    await connectDb();
    const updatedUser = await User.findOneAndUpdate(
      { id: id },
      updatedData,
      { new: true } // returns the updated doc
    );
    if (!updatedUser) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "User updated", user: updatedUser }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
