/**
 * Todo list
 * ! Inisialisasi import router express
 * ! Inisialisasi multer untuk uploads
 * ! Membuat beberapa path router method @get yang menerima data #readonly
 * * Method dalam backend
 * => @get , @post , @put , @patch , @delete
 * ! @get=> Method retrieved|yg menerima resource|data yang dikirim
 * ! @post=> Method send|yg mengirim resource|data sebagai sebuah resource baru
 * ! @put=> Method send|yg mengirim resource|data d iperbaharui|update dan mengambil keseluruhan body
 * ! @patch=> Method send|yg mengirim resource|data diperbaharui|update namun secara spesific resource yg ingin diubah
 * ! @delete=> Method yang menghapus resource yg diinsialasisasi
 */
const router = require("express").Router();//router middleware|function di express
const multer = require("multer");// multer untuk uploads
const upload = multer({ dest: "uploads/"});// dest = destination
const port = process.env.PORT ? process.env.PORT : 4000;// membuat  server port

router.get("/", (req, res)=>{
    const {page, total}=req.query;
    res.send({
        status: "Success",
        message: "Welcome to Express Tutorial",
        page,//page = query yang dimasukkan di path
        total// total = query yang  dimasukkan dipath
    });//response dalam bentuk tampil html
});
/**
 * ! Penjelasan flow
 * @get => sebuah method untuk mengambil nilai yang dikirim
 * @req => meminta nilai yang dikirim|ada 
 * @req => dapat berupa parameter/path url, query/string
 * @res => mengembalikan nilai yang didapatkan dari @req
 */

router.get("/product/:id", (req, res)=>{
    let data = req.params;//inisialisasi variable parameter
    res.json({
        id: data.id
    });//mengembalikan nilai param dalam bentuk json/ send respon json
});
router.post("/product", (req, res)=>{
    const {name, price, stocks, status}= req.body;//inisialisasi body 
    res.json(req.body);//send response dalam json yang didapat dari objects body
});
/**
 * ! Flownya
 * @post => sebuah method untuk mengupdate|mengirim sebuah nilai
 * @req => meminta nilai yang dikirim dari @post api
 * @res => mengembalikan nilai yang yang dikirim dari @post 
*/

// app.post('/productcover',upload.single("productimage") ,(req, res) => {
// })

router.get("/customer/:name", (req, res)=>{
    let name = req.params;//inisialisasi variable
    console.log(req.query);//check request berdasarkan query
    res.json({name});//send response dalam json
});


router.get("/:category/:tag", (req, res)=>{
    let {category, tag} = req.params;//inisialisasi object parameter
    res.json({
        category: category,
        tag: tag
    });//send response json dari object param
});

module.exports = {router, port};//standard module exports