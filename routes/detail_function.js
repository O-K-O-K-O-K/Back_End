// module.exports = {
//     isEmail: (value) => {
//         // value가 이메일 형식에 맞으면 true, 형식에 맞지 않으면 false를 return 하도록 구현해보세요
//         return false;
//     },
// };

//산책 약속 작성 
// router.post('/write', auth, add_post); 
// //산책 약속 상세 조회
// router.get('/:post_id', auth, get_one_post);
// //메인 조회
// router.get('/', get_all_posts)  
// //산책 게시물 수정하기
// router.patch('/:postId',auth, modify_post);
// // 산책 게시물 삭제하기
// router.delete('/:postId', auth, delete_post);

  
//산책 약속 작성하기 함수 
async function add_post(req,res) {
try {  
    console.log("write post 연결완료!")
    const completed = false;
    // const user_id = res.locals.user.user_id;

      const {meeting_date,wish_desc,location_category,longitude,latitude,location_address} = req.body;
      const params= [
        meeting_date,
        wish_desc,
        completed,
        location_category,
        longitude,
        latitude,
        location_address,
        user_id
      ];  
      const query =
      'INSERT INTO post (meeting_date,wish_desc,completed,location_category,longitude,latitude,location_address,user_id) VALUES(?,?,?,?,?,?,?,?)';
        await db.query(query, params, (error, rows, fields) => {
          console.log("row는",rows)
          if (error) {
            console.log(error)
            // logger.error(`Msg: raise Error in createPost => ${error}`);
            return res.status(400).json({
              success: false,
              errMessage: '400 에러 게시중 오류가 발생 하였습니다!.'
            });
          }
          // logger.info(`${userNickname}님, 게시글 등록이 완료되었습니다.`);
          return res.status(201).json({
            success: true,
            Message: '게시글이 성공적으로 포스팅 되었습니다!.'
          });
        });
      } catch (err) {
        // logger.error('게시글 작성 중 발생한 에러: ', err);
        console.log(err)
        return res.status(500).json({
          success: false,
          errMessage: '500 에러 게시중 오류가 발생 하였습니다!.'
        });     
      }
    }

    //산책 약속 상세 조회하기
async function get_one_post(req, res, next) 
{
try {
    const {post_id} = req.params;
    const user_id = res.locals.user.user_id;
    console.log("get method 연결완료!")

      const query = 
      `SELECT dog.dog_id, dog.dog_gender, dog.dog_name, dog.dog_size, dog.dog_breed, dog.dog_age, dog.neutral, dog.dog_comment, dog.dog_image,
      post.user_id, post.post_id, post.meeting_date, post.wish_desc, post.created_at, post.completed, post.location_category, post.longitude, post.latitude, post.location_address,
      user.user_nickname, user.user_gender, user.user_age, user.user_image
      from post
      join dog
      on post.user_id = dog.user_id
      join user
      on user.user_id = dog.user_id
      WHERE post.post_id =${post_id}`;
      //select * from post UNION select * from dog;
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 발생한 DB관련 에러', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        res.status(200).json({
          success: true,
          posts: rows[0],
        });
        console.log("rows는", rows[0])
      });
    } catch (err) {
      // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
      return res.sendStatus(500);
    }
  };

  //메인 페이지 조회하기 함수
  async function get_all_posts (req, res, next) {
try {
    console.log("get method 연결완료!")
    const {dog_size, dog_age, completed} = req.body;
    const location_category ="올림픽공원"
    const dog_gender= "남남"
    console.log(dog_size, dog_gender, dog_age, location_category, completed)
  
    // if (location_category == undefined) {
    //   console.log(1)
    // } else (console.log(2))
    // let {selected_category} =req.body
    // const [filter, subfilter] = selected_category.split("_");
    // console.log(filter) //all 을 했을때 안쓰게 하는 방법!

      const query = 
      `SELECT dog.dog_id, dog.dog_gender, dog.dog_name, dog.dog_size, dog.dog_breed, dog.dog_age, dog.neutral, dog.dog_comment, dog.dog_image, dog.user_id,
      post.user_id, post.post_id, post.meeting_date, post.completed, post.location_category  
      FROM post
      JOIN dog
      ON dog.user_id=post.user_id
      WHERE 1=1
      IF (!dog.dog_size='undefined') THEN (dog.dog_size = '${dog_size}');
      END IF`;
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 발생한 DB관련 에러', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        res.status(200).json({
          success: true,
          posts: rows,
        });
        console.log("rows는", rows)
      });
    } catch (err) {
      // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
      return res.sendStatus(500);
    }
  };

  //산책 약속 게시물 수정하기 함수
  async function modify_post (req, res) {
    try {
    const post_id = req.params.postId;
    const user_id = res.locals.user.user_id;
    const { location_category, meeting_date, wish_desc,longitude,latitude,location_address,completed} = req.body;
    const escapeQuery = {
      location_category: location_category,
      meeting_date: meeting_date,
      wish_desc: wish_desc,
      longitude:longitude,
      latitude:latitude,
      location_address:location_address,
      completed:completed,
    };
    const query = `UPDATE post SET ? WHERE post_id = ${post_id} and user_id = '${user_id}'`;
    await db.query(query, escapeQuery, (error, rows, fields) => {
      if (error) {
        console.log(error)
        // logger.error('게시글 수정 중 발생한 DB관련 에러: ', error);
        return res.status(400).json({
          success: false,
          error,
        });
      } else {
        // logger.info('게시글을 성공적으로 수정하였습니다.');
        return res.status(200).json({
          success: true,
        });
      }
    });
} catch (err) {
    // logger.error('게시글 조회하기 중 발생한 예상하지 못한 에러: ', err);
    return res.sendStatus(500);
  }
  };

async function delete_post (req, res) {
try {
    const  post_id  = req.params.postId;
    const user_id = res.locals.user.user_id;
    const query = `DELETE from post where post_id = ${post_id} and user_id = '${user_id}'`;

      await db.query(query, (error, rows, fields) => {
        if (error) {
          // logger.error('게시글 삭제 중 쿼리문 에러가 발생하였습니다. :', error);
          return res.status(400).json({
            success: false,
          });
        }
        // logger.info('게시글을 성공적으로 삭제하였습니다.');
        res.status(200).json({
          success: true,
        });
      });
    } catch (err) {
      res.status(500).json({ err: err });
    }
  };

  module.exports = { add_post, get_one_post, get_all_posts, modify_post,delete_post };