const {
  addcategory,
  login,editbatch,
  updateassignstatus,getalladmissions,
  programereqest,editclass,addbatch,
  programereqestbyid,addclass,addadmission,getallbatches,
  deletecategory,addavenue,deleteclass,updatebatchsttaus,
  getgallery,bookprogram,updateclasssttaus,
  addgalleryimages,getavenue,deleteavenue,
  editmainorgprofile,getmainuserprofile,updateadmissionstatus,
  getreviews,updateprice,getallclassesadmin,
  programereqestbymainusrname,submitreview,loginidd,
  getusers,deleteuser,editorgprofile,paymentupdate,
  programereqestbyusrname,addcourse,editcourse,
  getorganizer, getprofile,deleteorganizer,updatecoursesttaus,deletecourse,
 deletegallery, deletereview,updatetstaus, getmycourse,getunits,getallcourseadmin,editadmission,
   register, getcategory, edituserprofile, getuserprofile, getbookinghistory,onwerlogin,loginchecknew,cleardeviceid,getAllAdmissionsPaginated,getAllAdmissionsSearchService,
} = require("./user.service");
const cloudinary = require("../../Utils/cloudinary");

module.exports = {
    
    
    getAllAdmissionsSearch: (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;

  getAllAdmissionsSearchService(
    { search, limit, offset },
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Server error",
        });
      }

      return res.status(200).json({
        success: 1,
        page,
        limit,
        data: results,
      });
    }
  );
},


//login
  login: (req, res) => {
    const body = req.body;
    login(body, (err, results, type,name,userid) => {
      if (err) {
        console.log(err);
      }
      if (!results || type == 0) {
        return res.json({
          success: 0,
          message: "Not exist",
          mobile: "",
          name:"",
          userid:0
        
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          message: results,
          mobile: type,
           name:name,
           userid:userid
        });
      } else {
        return res.json({
          success: 0,
          message: "not exist",
          mobile: "",
        name:"",
        userid:0
        });
      }
    });
  },

 cleardeviceid: (req, res) => {
    const body = req.body;
    cleardeviceid(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

//login
  loginidd: (req, res) => {
    const body = req.body;
    login(body, (err, results, type,name,userid) => {
      if (err) {
        console.log(err);
      }
      if (!results || type == 0) {
        return res.status(200).json({
          success: 0,
          message: "Not exist",
          mobile: "",
          name:"",
          userid:0
        
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          message: results,
          mobile: type,
          name:name,
          userid:userid
        });
      } else {
        return res.status(200).json({
          success: 0,
          message: "not exist",
          mobile: "",
        name:"",
        userid:0
        });
      }
    });
  },


// loginidd: (req, res) => {
//   const body = req.body;

//   login(body, (err, result) => {
//     if (err) {
//       return res.json({ success: 0 });
//     }

//     if (!result || result.status !== "success") {
//       return res.json({
//         success: 0,
//         message: result?.message || "Not exist",
//         name: "",
//         userid: 0
//       });
//     }

//     return res.status(200).json({
//       success: 1,
//       message: "Login success",
//       name: result.name,
//       userid: result.userid
//     });
//   });
// },

    loginchecknew: (req, res) => {
    const body = req.body;
    loginchecknew(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  
 register: (req, res) => {
    const body = req.body;
    register(body, (err, results,userid) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          userid:0
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
           userid:userid
      });
    });
  },


  
 addcourse: (req, res) => {
    const body = req.body;
    addcourse(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },




   
 addclass: (req, res) => {
    const body = req.body;
    addclass(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },




   
 addbatch: (req, res) => {
    const body = req.body;
    addbatch(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },



  
   
 editbatch: (req, res) => {
    const body = req.body;
    editbatch(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

   
 addadmission: (req, res) => {
    const body = req.body;
    addadmission(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },


 editadmission: (req, res) => {
    const body = req.body;
    editadmission(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },

    
 editclass: (req, res) => {
    const body = req.body;
    editclass(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  
 editcourse: (req, res) => {
    const body = req.body;
    editcourse(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

getavenue: (req, res) => {
    
    getavenue( (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
        apple:0,
        android:0,
        player:0,
      });

    });
  },





  getallcourseadmin: (req, res) => {
    
    getallcourseadmin( (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
        player:0,
      });

    });
  },



  

  getallclassesadmin: (req, res) => {
    const body=req.body;
    getallclassesadmin(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });

    });
  },




  
  getalladmissions: (req, res) => {
    const body=req.body;
    getalladmissions(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });

    });
  },


getAllAdmissionsPaginated: (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  getAllAdmissionsPaginated(
    { limit, offset },
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Server error",
        });
      }

      return res.status(200).json({
        success: 1,
        page,
        limit,
        data: results,
      });
    }
  );
},



  
  
  getallbatches: (req, res) => {
    const body=req.body;
    getallbatches(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });

    });
  },

  getmycourse: (req, res) => {
     const body = req.body;
    getmycourse(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
        player:0,
      });

    });
  },


    getunits: (req, res) => {
     const body = req.body;
    getunits(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No data found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });

    });
  },





    onwerlogin: (req, res) => {
    const body = req.body;
    onwerlogin(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Not exist",
        
        
        });
      }
      if (results) {
        return res.status(200).json({
          success: 1,
          message: results,
         
        });
      } else {
        return res.json({
          success: 0,
          message: "not exist",
         
        });
      }
    });
  },


   updatecoursesttaus: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    updatecoursesttaus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },



  
   updatebatchsttaus: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    updatebatchsttaus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },

 


   updateclasssttaus: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    updateclasssttaus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },



  

   updateadmissionstatus: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    updateadmissionstatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },

 


  
   deletecourse: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    deletecourse(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },

 
  
  
   deleteclass: (req, res) => {
    const body = req.body;
    // for encript password
    // const salt=genSaltSync(10);
    // body.password=hashSync(body.password,salt);
    deleteclass(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }

      //   if(!results){
      //     return res.json({
      //         success:0,
      //         message:"Record not found"
      //     });
      // }

      return res.status(200).json({
        success: 1,
        message: results
      });
    });
  },

 


};