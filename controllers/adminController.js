const Category = require('../models/Category');
const Bank = require('../models/Bank');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard:(req, res) => {
        try {
            res.render('admin/dashboard/view_dashboard', {
                title: "Staycation | Dashboard",
            });
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/dashboard/view_dashboard', {
                title: "Staycation | Dashboard",
            });
        }
    },

    viewCategory:async (req,res) => {
        try {
            const categories = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/category/view_category', {
                categories,
                alert,
                title:"Staycation | Category",
            });
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/category/view_category', {
                title:"Staycation | Category",
            });
        }
    },

    addCategory:async (req,res) => {
        try {
            const {name} = req.body;
            await Category.create({name});
            req.flash('alertMessage','Success Add Category');
            req.flash('alertStatus','success');
            res.redirect('/admin/category');
            
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/category');
        }
    },
    
    editCategory:async (req,res) => {
        try {
            const {id, name} = req.body;
            const category = await Category.findOne({_id:id})
            category.name = name;
            await category.save();
            req.flash('alertMessage','Success Update Category');
            req.flash('alertStatus','success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/category');
            
        }
    },
    
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            await category.remove();
            req.flash('alertMessage','Success Delete Category');
            req.flash('alertStatus','success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/category');
        }
      },

    viewBank:async (req,res) => {
        try {
            const banks = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            res.render('admin/bank/view_bank', {
                banks,
                alert,
                title: "Staycation | Bank",
            });
            
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/bank/view_bank', {
                title: "Staycation | Bank",
            });
        }
    },

    addBank: async (req,res) => {
        try {
            const {nameBank, nomorRekening, name} = req.body;
            await Bank.create({
                nameBank, 
                nomorRekening, 
                name, 
                imageUrl : `images/${req.file.filename}`,
            });
            req.flash('alertMessage','Success Add Bank');
            req.flash('alertStatus','success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/bank');
        }
    },

    editBank: async (req,res) => {
        try {
            const {id, name, nameBank, nomorRekening} = req.body;
            const bank = await Bank.findById(id);
            bank.name = name;
            bank.nameBank = nameBank;
            bank.nomorRekening = nomorRekening;
            if(req.file != undefined){
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.imageUrl = `images/${req.file.filename}`;
            }
            bank.save();
            req.flash('alertMessage','Success Delete Bank');
            req.flash('alertStatus','success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/bank');
        }

    },

    deleteBank: async (req,res) => {
        try {
            const {id} = req.params;
            const bank = await Bank.findById(id);
            await bank.remove();
            req.flash('alertMessage','Success Delete Bank');
            req.flash('alertStatus','success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/bank');
        }

    },

    viewItem:(req,res) => {
        try {
            res.render('admin/item/view_item', {
                title: "Staycation | Item",
            });
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/item/view_item', {
                title: "Staycation | Item",
            });
        }
    },

    viewBooking:(req,res) => {
        try {
            res.render('admin/booking/view_booking', {
              title: "Staycation | Booking",
            });
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/booking/view_booking', {
                title: "Staycation | Booking",
            });
        }
    },
}