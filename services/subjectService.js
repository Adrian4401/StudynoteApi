const { Subject } = require('../models');

const getAllSubjects = async (userId) => {
    return await Subject.findAll({
        where: { 
            userId, 
            isDeleted: false 
        }
    });
}

const getSubject = async (id, userId) => {
    return await Subject.findOne({
        where: { 
            id, 
            userId, 
            isDeleted: false 
        }
    });
}

const addSubject = async (name, userId) => {
    return await Subject.create({ 
        name, 
        userId 
    });
}

const updateSubject = async (id, name, userId) => {
    return await Subject.update(
        { name },
        { where: { 
            id, 
            userId, 
            isDeleted: false 
        } }
    );
}

const deleteSubject = async (id, userId) => {
    return await Subject.update(
        { isDeleted: true },
        { where: { 
            id, 
            userId, 
            isDeleted: false 
        } }
    );
}

module.exports = { getAllSubjects, getSubject, addSubject, updateSubject, deleteSubject };