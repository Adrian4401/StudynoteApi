const { Class } = require('../models');

const getAllClasses = async (userId) => {
    return await Class.findAll({
        where: { 
            userId, 
            isDeleted: false 
        },
        attributes: [
            'id',
            'name'
        ]
    });
}

const getClass = async (id, userId) => {
    return await Class.findOne({
        where: { 
            id, 
            userId, 
            isDeleted: false 
        },
        attributes: [
            'id',
            'name'
        ]
    });
}

const addClass = async (name, userId) => {
    const newClass = await Class.create({ name, userId })

    return {
        id: newClass.id,
        name: newClass.name
    }
}

const updateClass = async (id, name, userId) => {
    return await Class.update(
        { name },
        { where: { 
            id, 
            userId, 
            isDeleted: false 
        } }
    );
}

const deleteClass = async (id, userId) => {
    return await Class.update(
        { isDeleted: true },
        { where: { 
            id, 
            userId, 
            isDeleted: false 
        } }
    );
}

module.exports = { getAllClasses, getClass, addClass, updateClass, deleteClass };