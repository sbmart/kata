import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize(
    'relay',
    'dev',
    'dev',
    {
        dialect: 'postgres'
    }
);

const Person = Conn.define('person', {
    firstName: {
        type:Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true}).then(()=>{
    _.times(500, ()=>{
        Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(person => {
            return person.createPost({
                title: `Post title by ${person.firstName}`,
                content: 'The content of the post by the respective author'
            });
        });
    });
});
