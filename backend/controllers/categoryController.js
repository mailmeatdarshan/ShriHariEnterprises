import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ Error: "Please provide a name" })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(400).json({ Error: "Category already exists" })
        }
        const category = await new Category({ name }).save()
        res.status(201).json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params

        const category = await Category.findOne({ _id: categoryId })
        if (!category) {
            return res.status(404).json({ Error: "Category not found" })
        }
        category.name = name
        const updatedCategory = await category.save()
        res.status(200).json(updatedCategory)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ Error: "Internal Server Error" })
    }
})

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removedCategory = await Category.findByIdAndDelete(req.params.categoryId)
        res.status(200).json(removedCategory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Error: "Internal Server Error" })
    }
})

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ Error: "Internal Server Error" })
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id })
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ Error: "Internal Server Error" })
    }
})

export { createCategory, updateCategory, removeCategory, listCategory, readCategory };





