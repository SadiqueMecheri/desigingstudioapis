const pool = require("../../config/database");

module.exports = {





getAllAdmissionsSearchService: (data, callBack) => {
  const searchValue = `%${data.search}%`;

  pool.query(
    `
    SELECT 
      login.*,
      admission.purchasedate,
      admission.id AS admissionid,
      admission.courseid AS admissioncourseid,
      admission.batchid AS admissionbatchid,
      course.coursename,
      admission.isactive AS admissionstatus
    FROM admission
    JOIN login ON admission.userid = login.id
    JOIN course ON admission.courseid = course.id
    WHERE 
      login.name LIKE ? 
      OR login.mobile_no LIKE ?
    ORDER BY admission.id DESC
    LIMIT ? OFFSET ?
    `,
    [searchValue, searchValue, data.limit, data.offset],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
},

  login: (data, callBack) => {
    pool.query(
      `SELECT * FROM login WHERE mobile_no = ?`,
      [data.mobileno],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        if (results.length > 0) {
          console.log("User exists");
          let type = results[0]["mobile_no"];
          let name = results[0]["name"];
          let userid = results[0]["id"];



          // Other types return type only
          return callBack(null, "success", type, name, userid);

        } else {
          return callBack(null, "failed", "00", 0);
        }
      }
    );
  }

  ,
  
  
  cleardeviceid: (data, callBack) => {
  pool.query(
    `SELECT * FROM login WHERE mobile_no = ?`,
    [data.mobile_no],
    (error, results) => {
      if (error) {
        return callBack(error);
      }

      if (results.length === 0) {
        return callBack(null, {
          status: 'error',
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      // ✅ Always clear only mobile device info (deviceid)
      const updateQuery = `UPDATE login SET deviceid = NULL WHERE mobile_no = ?`;

      pool.query(
        updateQuery,
        [data.mobile_no],
        (updateError, updateResults) => {
          if (updateError) {
            return callBack(updateError);
          }

          return callBack(null, {
            status: 'success',
            message: 'Mobile device ID cleared successfully',
            affectedRows: updateResults.affectedRows
          });
        }
      );
    }
  );
},

  
loginidd: (data, callBack) => {
  pool.query(
    `SELECT * FROM login WHERE mobile_no = ?`,
    [data.mobileno],
    (error, results) => {
      if (error) {
        return callBack(error);
      }

      if (results.length > 0) {
        const user = results[0];
        const userid = user.id;
        const name = user.name;
        const type = user.mobile_no;

        // ✅ Check if deviceid exists in DB
        if (user.deviceid && user.deviceid !== "") {
          // If deviceid exists, compare with given deviceid
          if (user.deviceid !== data.deviceid) {
            return callBack(null, {
              status: "error",
              message: "This account is already registered with another mobile device",
              code: "DEVICE_LIMIT"
            });
          } else {
            // Device ID matches → login success
            return callBack(null, {
              status: "success",
              type,
              name,
              userid
            });
          }
        } else {
          // If no deviceid in DB, update it now
          pool.query(
            `UPDATE login SET deviceid = ? WHERE id = ?`,
            [data.deviceid, userid],
            (updateErr) => {
              if (updateErr) {
                return callBack(updateErr);
              }
              return callBack(null, {
                status: "success",
                type,
                name,
                userid,
                message: "Device ID registered successfully"
              });
            }
          );
        }
      } else {
        // User not found
        return callBack(null, {
          status: "failed",
          message: "User not found",
          code: "USER_NOT_FOUND"
        });
      }
    }
  );
},
  


loginchecknew: (data, callBack) => {
  pool.query(
    `SELECT * FROM login WHERE mobile_no = ?`,
    [data.mobile_no],
    (error, results) => {
      if (error) {
        return callBack(error);
      }

      if (results.length === 0) {
        return callBack(null, {
          status: 'error',
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      const user = results[0];
      const userId = user.id;

      // ✅ If FCM token is provided, insert into user_tokens table
      if (data.fcmtoken && data.fcmtoken.trim() !== "") {
        pool.query(
          `INSERT INTO user_tokens (user_id, token) 
           VALUES (?, ?) 
           ON DUPLICATE KEY UPDATE token = token`,
          [userId, data.fcmtoken],
          (tokenErr) => {
            if (tokenErr) {
              console.error("Error inserting FCM token:", tokenErr);
            }
          }
        );
      }

      // ✅ Mobile device check only
      if (user.deviceid && user.deviceid !== data.deviceid) {
        return callBack(null, {
          status: 'error',
          message: 'This account is already registered with another mobile device',
          code: 'DEVICE_LIMIT_MOBILE'
        });
      }

      if (!user.deviceid) {
        pool.query(
          `UPDATE login SET deviceid = ?, device = ? WHERE mobile_no = ?`,
          [data.deviceid, data.device, data.mobile_no],
          (updateError) => {
            if (updateError) {
              return callBack(updateError);
            }
            return callBack(null, {
              ...user,
              deviceid: data.deviceid,
              device: data.device,
              status: 'success',
              message: 'Mobile device information updated'
            });
          }
        );
      } else {
        return callBack(null, {
          ...user,
          status: 'success',
          message: 'Login successful'
        });
      }
    }
  );
},







  register: (data, callBack) => {
        // Set default values if deviceid or device is missing
  const deviceId = data.deviceid ? data.deviceid : "";
  const device = data.device ? data.device : "";

    pool.query(
      `insert into login(mobile_no,name,isactive, deviceid, device)values(?,?,?,?,?)`,
      [
        data.mobile_no,
        data.name,
        1,
          deviceId,    // Insert deviceid if provided, else empty
      device       // Insert device name if provided, else empty


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
          const insertedUserId = results.insertId;
        return callBack(null, "success",insertedUserId);

      }
    );






  },


  // getclinicbydoctor
  getavenue: (callBack) => {
    pool.query(
      `select * from course where isactive=1`,
      [

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  // getclinicbydoctor
  getallcourseadmin: (callBack) => {
    pool.query(
      `select * from course`,
      [

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },



  // getclinicbydoctor
  getallclassesadmin: (data, callBack) => {
    pool.query(
      `select * from classes where course_id=?`,
      [
        data.courseid
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },





  // getclinicbydoctor
  getalladmissions: (data, callBack) => {
    pool.query(
      `SELECT login.*,admission.purchasedate,admission.id as admisonid,admission.courseid as admisoncourseid,admission.batchid as admisionbathcid, course.coursename,admission.isactive as admisionstauts FROM admission,course,login WHERE admission.userid=login.id and admission.courseid=course.id;`,
      [
        data.courseid
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

getAllAdmissionsPaginated: (data, callBack) => {
  pool.query(
    `
    SELECT 
      login.*,
      admission.purchasedate,
      admission.id AS admissionid,
      admission.courseid AS admissioncourseid,
      admission.batchid AS admissionbatchid,
      course.coursename,
      admission.isactive AS admissionstatus
    FROM admission
    JOIN login ON admission.userid = login.id
    JOIN course ON admission.courseid = course.id
    ORDER BY admission.id DESC
    LIMIT ? OFFSET ?
    `,
    [data.limit, data.offset],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
},




  // getclinicbydoctor
  getallbatches: (data, callBack) => {
    pool.query(
      `SELECT 
    batch.*, 
    course.coursename AS course_name,
    COUNT(admission.id) AS student_count
FROM batch
LEFT JOIN admission ON batch.id = admission.batchid
LEFT JOIN course ON batch.courseid = course.id GROUP BY batch.id, course.coursename`,
      [

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },




  // getclinicbydoctor
  getmycourse: (data, callBack) => {
    pool.query(
      `select course.*,admission.batchid,batch.startdate from admission,course,batch where admission.courseid=course.id and admission.batchid=batch.id and admission.userid=? and admission.isactive=1`,
      [
        data.userid
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },




  // getclinicbydoctor
  getunits: (data, callBack) => {
    pool.query(


          `SELECT classes.* 
        FROM classes
        JOIN batch ON batch.id = ? AND batch.isactive = 1
        WHERE classes.course_id = ?  
          AND classes.isactive = 1 
          AND classes.seqnce_no <= DATEDIFF(CURDATE(), batch.startdate) + 1
        ORDER BY classes.seqnce_no;`,
    //   `SELECT * FROM classes WHERE course_id = ?  AND isactive = 1 AND seqnce_no <= DATEDIFF(CURDATE(), (SELECT startdate FROM batch WHERE id = ?)) + 1 ORDER BY seqnce_no;`,
      [
 data.batchid,
        data.courseid,
       
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },






  onwerlogin: (data, callBack) => {
    pool.query(
      `SELECT * FROM ownerlogin WHERE username = ? and password=? and isactive=1`,
      [data.username, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        if (results.length > 0) {




          // Other types return type only
          return callBack(null, "success");

        } else {
          return callBack(null, "failed");
        }
      }
    );
  }

  ,




  updatecoursesttaus: (data, callback) => {

    pool.query(
      'update course set isactive=? where id=?',
      [
        data.status,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },







  updatebatchsttaus: (data, callback) => {

    pool.query(
      'update batch set isactive=? where id=?',
      [
        data.status,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },





  updateclasssttaus: (data, callback) => {

    pool.query(
      'update classes set isactive=? where id=?',
      [
        data.status,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },






  updateadmissionstatus: (data, callback) => {

    pool.query(
      'update admission set isactive=? where id=?',
      [
        data.status,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },




  deletecourse: (data, callback) => {

    pool.query(
      'delete from course where id=?',
      [

        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },






  deleteclass: (data, callback) => {

    pool.query(
      'delete from classes where id=?',
      [

        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }




        return callback(null, results[0]);





      }
    );

  },




  addcourse: (data, callBack) => {

    pool.query(
      `insert into course(coursename,courseimage,description,price,note,isactive,videofrom)values(?,?,?,?,?,?,?)`,
      [
        data.coursename,
        data.courseimage,
        data.description,
        data.price,
        data.note,
        1,
        data.videofrom


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },






  addclass: (data, callBack) => {

    pool.query(
      `insert into classes(course_id,title,description,ytlink,thumburl,seqnce_no,isactive,serverlink)values(?,?,?,?,?,?,?,?)`,
      [
        data.course_id,
        data.title,
        data.description,
        data.ytlink,
        data.thumburl,
        data.seqnce_no,
        1,
        data.serverlink,


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },








  addbatch: (data, callBack) => {

    pool.query(
      `insert into batch(batchname,courseid,startdate,isactive)values(?,?,?,?)`,
      [
        data.batchname,
        data.courseid,
        data.startdate,
        1,



      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },








  editbatch: (data, callBack) => {

    pool.query(
      `update batch set batchname=?,courseid=?,startdate=? where id =?`,
      [
        data.batchname,
        data.courseid,
        data.startdate,
        data.id,



      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },


addadmission: (data, callBack) => {
  pool.query(
    `SELECT id FROM login WHERE mobile_no = ?`,
    [data.mobile_no],
    (error, results) => {
      if (error) {
        return callBack(error);
      }

      const today = new Date();

      if (results.length > 0) {
        const userId = results[0].id;

        // Check if user is already admitted to the course
        pool.query(
          `SELECT batchid FROM admission WHERE userid = ? AND courseid = ?`,
          [userId, data.courseid],
          (error, results) => {
            if (error) {
              return callBack(error);
            }

            if (results.length > 0) {
              const existingBatchId = results[0].batchid;

              if (existingBatchId == data.batchid) {
                return callBack(null, "Course already exists");
              } else {
                return callBack(null, `This student already in batch`);
              }
            } else {
              // Insert new admission
              pool.query(
                `INSERT INTO admission(userid, courseid, batchid, purchasedate, isactive) VALUES (?, ?, ?, ?, ?)`,
                [userId, data.courseid, data.batchid, today, 1],
                (error, results) => {
                  if (error) {
                    return callBack(error);
                  }
                  return callBack(null, "success");
                }
              );
            }
          }
        );
      } else {
        // Insert new user
        pool.query(
          `INSERT INTO login(mobile_no, name, isactive) VALUES (?, ?, ?)`,
          [data.mobile_no, data.name, 1],
          (error, results) => {
            if (error) {
              return callBack(error);
            }

            const newUserId = results.insertId;

            pool.query(
              `INSERT INTO admission(userid, courseid, batchid, purchasedate, isactive) VALUES (?, ?, ?, ?, ?)`,
              [newUserId, data.courseid, data.batchid, today, 1],
              (error, results) => {
                if (error) {
                  return callBack(error);
                }
                return callBack(null, "success");
              }
            );
          }
        );
      }
    }
  );
},


editadmission: (data, callBack) => {
  const today = new Date();

  // Get userid from current admission
  pool.query(
    `SELECT userid FROM admission WHERE id = ?`,
    [data.id],
    (error, results) => {
      if (error) {
        return callBack(error);
      }

      if (results.length === 0) {
        return callBack(null, "Admission not found");
      }

      const userId = results[0].userid;

      // Check if this user is already in the course (but different admission entry)
      pool.query(
        `SELECT batchid FROM admission WHERE userid = ? AND courseid = ? AND id != ?`,
        [userId, data.courseid, data.id],
        (error, results) => {
          if (error) {
            return callBack(error);
          }

          if (results.length > 0) {
            const existingBatchId = results[0].batchid;

            if (existingBatchId == data.batchid) {
              return callBack(null, "Course already exists");
            } else {
              return callBack(null, "This student already in batch");
            }
          } else {
            // Update login table
            pool.query(
              `UPDATE login SET mobile_no = ?, name = ? WHERE id = ?`,
              [data.mobile_no, data.name, userId],
              (error, results) => {
                if (error) {
                  return callBack(error);
                }

                // Update admission table
                pool.query(
                  `UPDATE admission SET courseid = ?, batchid = ?, purchasedate = ?, isactive = ? WHERE id = ?`,
                  [data.courseid, data.batchid, today, 1, data.id],
                  (error, results) => {
                    if (error) {
                      return callBack(error);
                    }
                    return callBack(null, "updated successfully");
                  }
                );
              }
            );
          }
        }
      );
    }
  );
},


//   addadmission: (data, callBack) => {
//   // Step 1: Check if mobile number exists
//   pool.query(
//     `SELECT id FROM login WHERE mobile_no = ?`,
//     [data.mobile_no],
//     (error, results) => {
//       if (error) {
//         return callBack(error);
//       }

//       const today = new Date();
//       if (results.length > 0) {
//         // Mobile exists
//         const userId = results[0].id;

//         // Step 2: Check if course already exists for this user
//         pool.query(
//           `SELECT id FROM admission WHERE userid = ? AND courseid = ?`,
//           [userId, data.courseid],
//           (error, results) => {
//             if (error) {
//               return callBack(error);
//             }

//             if (results.length > 0) {
//               // Course already exists
//               return callBack(null, "Course already exists");
//             } else {
//               // Insert admission record
//               pool.query(
//                 `INSERT INTO admission(userid, courseid, batchid, purchasedate, isactive) VALUES (?, ?, ?, ?, ?)`,
//                 [userId, data.courseid, data.batchid, today, 1],
//                 (error, results) => {
//                   if (error) {
//                     return callBack(error);
//                   }
//                   return callBack(null, "success");
//                 }
//               );
//             }
//           }
//         );
//       } else {
//         // Mobile not found, insert new login
//         pool.query(
//           `INSERT INTO login(mobile_no, name, isactive) VALUES (?, ?, ?)`,
//           [data.mobile_no, data.name, 1],
//           (error, results) => {
//             if (error) {
//               return callBack(error);
//             }

//             const newUserId = results.insertId;

//             // Insert admission record for new user
//             pool.query(
//               `INSERT INTO admission(userid, courseid, batchid, purchasedate, isactive) VALUES (?, ?, ?, ?, ?)`,
//               [newUserId, data.courseid, data.batchid, today, 1],
//               (error, results) => {
//                 if (error) {
//                   return callBack(error);
//                 }
//                 return callBack(null, "success");
//               }
//             );
//           }
//         );
//       }
//     }
//   );
// },





  editclass: (data, callBack) => {

    pool.query(
      `update classes set course_id=?,title=?,description=?,ytlink=?,thumburl=?,seqnce_no=?,serverlink=? where id =?`,
      [
        data.course_id,
        data.title,
        data.description,
        data.ytlink,
        data.thumburl,
        data.seqnce_no,
        data.serverlink,
        data.id,


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },











  editcourse: (data, callBack) => {

    pool.query(
      `update course set coursename=?,courseimage=?,description=?,price=?,note=?,videofrom=? where id=?`,
      [
        data.coursename,
        data.courseimage,
        data.description,
        data.price,
        data.note,
        data.videofrom,
        data.id,
      


      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, "success");

      }
    );






  },









};

