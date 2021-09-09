const Category = require('../models/Category');
const Bank = require('../models/Bank');
const fs = require('fs-extra');
const path = require('path');
const Item = require('../models/Item');
const Image = require('../models/Image');

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

    viewItem: async (req,res) => {
        try {
            const categories = await Category.find();
            const items = await Item.find()
                .populate({path:'imageId', select:'id imageUrl'})
                .populate({path:'categoryId', select:'id name'});
            console.log(items);
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/item/view_item', {
                title: "Staycation | Item",
                categories,
                items,
                alert,
            });
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.render('admin/item/view_item', {
                title: "Staycation | Item",
            });
        }
    },

    addItem: async (req,res) => {
        try {
            const {categoryId, title, price, city, about} = req.body;
            if(req.files.length > 0){
                const category = await Category.findById(categoryId);
                const newItem = {
                    title,
                    price,
                    city,
                    description:about,
                    categoryId : category._id,
                }
                const item = await Item.create(newItem);
                category.itemId.push({_id:item._id});
                await category.save();
                for(let i=0; i<req.files.length; i++){
                    const imageSave = await Image.create({imageUrl:`images/${req.files[i].filename}`});
                    item.imageId.push({_id:imageSave._id});
                    await item.save();
                }
                req.flash('alertMessage','Berhasil Add Item');
                req.flash('alertStatus','success');
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/admin/item');
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