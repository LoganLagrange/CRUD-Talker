const sequelize = require(`../config/connection`);
const {User} = require(`../models`);

const userData = [
    {
        username: `fatmanatee0`,
        name: `Logan Lagrange`,
        password: `password`,
        email: `lagrangelogan@gmail.com`
    },
    {
        username: `nillows`,
        name: `Thom Wollin`,
        password: `password`,
        email: ``
    },
    {
        username: `Spec-Tr`,
        name: `Spencer Tyber`,
        password: `password`,
        email: ``
    },
    {
        username: `Ren3546`,
        name: `Renato Valdez`,
        password: `password`,
        email: ``
    }
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });
    console.table(dbUsers.map(user=>user.toJSON()));
    process.exit(0);
}

seedMe();