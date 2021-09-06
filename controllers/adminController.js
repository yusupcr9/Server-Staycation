const Category = require('../models/Category');

module.exports = {
    viewDashboard:(req, res) => {
        res.render('admin/dashboard/view_dashboard');
    },

    viewCategory:async (req,res) => {
        const categories = await Category.find();
        // console.log(category);
        res.render('admin/category/view_category', {categories});
    },

    addCategory:async (req,res) => {
        console.log("add kepanggil");
        const {name} = req.body;
        await Category.create({name});
        res.redirect('/admin/category');
    },
    
    editCategory:async (req,res) => {
        console.log("Edit KEPANGGIL");
        res.redirect('/admin/category');
    },
    
    deleteCategory:async (req,res) => {
        console.log("Delete KEPANGGIL");
        res.redirect('/admin/category');
    },

    viewBank:(req,res) => {
        res.render('admin/bank/view_bank');
    },

    viewItem:(req,res) => {
        res.render('admin/item/view_item');
    },

    viewBooking:(req,res) => {
      res.render('admin/booking/view_booking');
    },
}