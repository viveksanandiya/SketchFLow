import express from "express";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { prismaClient } from "@repo/db/client";
import { CreateRoomSchema,CreateUserSchema, SigninSchema} from "@repo/common/types";
import { middleware } from "./middleware";
import { JWT_TOKEN } from "@repo/backend-common/config";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  try {
    const hashedPass = await argon2.hash(parsedData.data.password);

    const user = await prismaClient.user.create({
      data: {
        name: parsedData.data.name,
        password: hashedPass,
        email: parsedData.data?.email,
      },
    });
    console.log(user.id)
    
    res.json({
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(411).json({
      message: "-------some error caught at try catch"
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      error: parsedData.error,
    });
    return;
  }

  try {
    const isUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!isUser) {
      res.json({
        message: "user not found",
      });
      return;
    }

    const dbPass = isUser.password;
    const isCorrectPass = await argon2.verify(dbPass, parsedData.data.password);

    if (!isCorrectPass) {
      res.json({
        message: "incorrect cred",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: isUser.id,
      },
      JWT_TOKEN
    );

    res.json({
      token: token,
    });
  } catch (err) {
    res.json({
      message: "try catch err",
    });
  }
});

app.post("/room", middleware, async (req, res) => {  
  const parsedData = CreateRoomSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  //@ts-ignore
  const userId = req.userId;

  try{
  const room = await prismaClient.room.create({
  data:{
    slug : parsedData.data?.slug,
    adminId : userId
  }
  });

  res.json({
    roomId: room.id
  });
  return;

  }catch(err){
    console.log("error :"+ err)
    res.status(411).json({
        message: "room with this name already exist"
    })
    return;
}

});

//getting old message from db
app.get("/chats/:roomId", async (req , res)=>{
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where:{
      roomId: roomId
    },
    orderBy:{
      id: "desc"
    },
    take: 50
  })

  res.json({
    messages
  })
})

app.get("/room/:slug", async (req , res)=>{
  const slug = req.params.slug;
  const room = await prismaClient.chat.findFirst({
    where:{
      //@ts-ignore
      slug
    }
  })

  res.json({
    room
  })
})

app.listen(6969);
