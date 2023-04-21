const connection = require('../config/connection');
const { User, Thoughts } = require('../models/index');
const { default: mongoose } = require('mongoose');

const users = [
    {
        username: "JonG",
        email: "jong@hotmail.com",
        password: "password12345",
        friends: []
    },
    {
        username: "TeflonJuan",
        email: "example@hotmail.com",
        password: "123$Abc",
        friends: []
    },
    {
        username: "John123",
        email: "john123@example.com",
        password: "p@ssword123",
        friends: []
    },
    {
        username: "Himothy",
        email: "himothy@hotmail.com",
        password: "iMhim123",
        friends: []
    },
    {
        username: "KobeShow24",
        email: "kobedgoat@example.com",
        password: "Kobe824",
        friends: []
    }
]

const posts = [
    {
        thoughtText: "Man Kobe is the GOAT, dont @ me",
        username: "KobeShow24",
        reactions: []
    },
    {
        thoughtText: "I AM HIM!",
        username: "Himothy",
        reactions: []
    },
    {
        thoughtText: "Is Stranger Things the greatest show of all time?",
        username: "TeflonJuan",
        reactions: []
    },
    {
        thoughtText: "What is the meaning of life?",
        username: "JonG",
        reactions: []
    },
    {
        thoughtText: "Should pineapples be allowed on pizza?",
        username: "John123",
        reactions: []
    }
]

const reactions = [
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Stop that, everyone knows Lebron is the GOAT",
        username: "JonG"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "You indeed, are HIM",
        username: "KobeShow24"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Is this even a debate?",
        username: "John123"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Some would say its the number 42",
        username: "Himothy"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "According to the Pizza Eaters Union, it is not accepted",
        username: "KobeShow24"
    }
  
]

connection.once("open", async () => {
    await User.deleteMany({})
    await Thoughts.deleteMany({})

   await User.insertMany(users)

   for(let i = 0; i < posts.length; i++){
    const user = await User.findOne({ username: posts[i].username})
    console.log(user)
    const newThought = await Thoughts.create({
        thoughtText: posts[i].thoughtText,
        username: posts[i].username,
        userId: user._id,
        reactions: reactions[i]
    })
    await User.findOneAndUpdate({username: posts[i].username},{
        $push : {thoughts: newThought._id}
    })
   }
   console.table(users)
   console.table(posts)
   console.table(reactions)
   console.log("Seeding successful!")
   process.exit(1)
})