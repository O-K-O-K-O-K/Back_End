// 내 정보 수정하기
//1번 
router.patch("/me", upload.single("user_image"), auth, async (req, res) => {
  // null 값일 때, 강아지 원래 사진 보내주기

  try {
    const user_id = res.locals.user.user_id;
    console.log("req.body:", req.body);
    const { user_nickname, user_gender, user_age } = req.body;

    console.log("req.file:", req.file);
    const user_image = req.file.location;
    console.log("이미지 타입:", typeof user_image);

    //const obj = JSON.parse(JSON.stringify(user_image));
    //console.log("obj: ", obj)

    const escapeQuery = {
      user_nickname: user_nickname,
      user_gender: user_gender,
      user_age: user_age,
      user_image: user_image,
    };
    console.log("이미지 타입:", typeof user_image);

    console.log("여기: ", escapeQuery);

    const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;

    await db.query(userQuery, escapeQuery, async (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        msg: "user 정보 수정 성공!",
        user,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
});

// 내 정보 수정하기
//먼저 이미지를 불러온 후, 수정하기
// 2번 - 비어 있어도 됨 , 근데 다른거 변경 안됨
router.patch("/me", upload.single("user_image"), auth, async (req, res) => {
  try {
    const user_id = res.locals.user.user_id;

    let { user_nickname, user_gender, user_age } = req.body;

    console.log("req.file: ", req.file)
    const user_image = req.file.location;

    console.log("user_image", user_image); //userImage가 없으면, undefined로 뜬다.
    console.log("이미지 타입:", typeof user_image);

    if (user_image == undefined) {
      //user의 이미지를 가져온다.
      let i;
      const userDb = `SELECT user.user_image FROM user WHERE user.user_id= "${user_id}"`;
      const thisIsImage = await db.query(userDb);
      i = thisIsImage[0];

      console.log("이게 이미지다", i);

      const escapeQuery = {
        user_nickname: user_nickname,
        user_gender: user_gender,
        user_age: user_age,
        user_image: user_image,
      };
      console.log("이미지 타입:", typeof user_image);

      console.log("여기: ", escapeQuery);

      const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;

      await db.query(userQuery, escapeQuery, async (err, user) => {
        if (err) {
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          msg: "user 정보 수정 성공!",
          user,
        });
      });

    } else {

      // user_image = req.file.location;
      // console.log("else문의 user_image:", user_image)

      const escapeQuery = {
        user_nickname: user_nickname,
        user_gender: user_gender,
        user_age: user_age,
        user_image: user_image,
      };
      console.log("이미지 타입:", typeof user_image);

      console.log("여기: ", escapeQuery);

      const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;

      await db.query(userQuery, escapeQuery, async (err, user) => {
        if (err) {
          return res.status(400).json({
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          msg: "user 정보 수정 성공!",
          user,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});


// 3번
router.patch("/me", upload.single("user_image"), auth, async (req, res) => {
    try {
      const user_id = res.locals.user.user_id;
  
      let { user_nickname, user_gender, user_age, user_image } = req.body;
  
  
      //console.log("req.file: ", req.file)
      //const user_image = req.file.location;
  
      console.log("user_image: ", user_image); //userImage가 없으면, undefined로 뜬다.
      console.log("이미지 타입:", typeof user_image);
  
      if (user_image = " ") {
        //user의 이미지를 가져온다.
        let i;
        const userDb = `SELECT user.user_image FROM user WHERE user.user_id= "${user_id}"`;
        const thisIsImage = await db.query(userDb);
        i = thisIsImage[0];
  
        console.log("이게 이미지다", i);
  
        const escapeQuery = {
          user_nickname: user_nickname,
          user_gender: user_gender,
          user_age: user_age,
          user_image: i,
        };
        console.log("이미지 타입:", typeof user_image);
  
        console.log("여기: ", escapeQuery);
  
        const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;
  
        await db.query(userQuery, escapeQuery, async (err, user) => {
          if (err) {
            return res.status(400).json({
              success: false,
            });
          }
          return res.status(200).json({
            success: true,
            msg: "user 정보 수정 성공!",
            user,
          });
        });
  
      } else {
  
        user_image = req.file.location;
        console.log("else문의 user_image:", user_image)
  
        const escapeQuery = {
          user_nickname: user_nickname,
          user_gender: user_gender,
          user_age: user_age,
          user_image: user_image,
        };
        console.log("이미지 타입:", typeof user_image);
  
        console.log("여기: ", escapeQuery);
  
        const userQuery = `UPDATE user SET ? WHERE user.user_id = '${user_id}'`;
  
        await db.query(userQuery, escapeQuery, async (err, user) => {
          if (err) {
            return res.status(400).json({
              success: false,
            });
          }
          return res.status(200).json({
            success: true,
            msg: "user 정보 수정 성공!",
            user,
          });
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
      });
    }
  });