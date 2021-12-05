"use strict";
const { db } = require("../../models/index");

const getAllPosts = (req, res, next) => {
    console.log("get method 연결완료!")
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum)
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize)
    const query = `SELECT count(*) as count
      FROM post`
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
        console.log("전체 글 개수",totalCount)
        const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
        console.log("페이지네이션의 전체 카운트 ",pnTotal)
        const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize); // NOTE: 현재 페이지의 페이지네이션 시작 번호.
        console.log("현재 페이지의 페이지네이션 시작 번호", pnStart)
        let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
        console.log("현재 페이지의 페이지네이션 끝 번호",pnEnd)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
        post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
        FROM post
        JOIN dog
        ON dog.userId=post.userId
        ORDER BY post.createdAt DESC 
        LIMIT ${skipSize},${contentSize}`
        console.log(query2)
        db.query(query2, (error, results) => {
          console.log("들어오니")
          if (error) {
            console.log(error)
            // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
          }
          console.log("찐결과",results)
          if (pnEnd>pnTotal) pnEnd = pnTotal; 
          console.log(pnEnd,pnTotal)
          const result = {
            pageNum,
            pnStart,
            pnEnd,
            pnTotal,
            contents : results
          };
          res.status(200).json({
            success: true,
            posts: result,
          })
        console.log("rows는", rows)
      }); 
    });  
  }

const getOlympicParkPosts = (req, res, next) => {
    console.log("get method 연결완료!")
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum)
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum-1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize)
    const location = "올림픽공원"
    const query = `SELECT count(*) as count
      FROM post
      where post.locationCategory ='${location}'
      ORDER BY post.createdAt DESC `
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
        console.log("전체 글 개수",totalCount)
        const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
        console.log("페이지네이션의 전체 카운트 ",pnTotal)
        const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
        console.log("현재 페이지의 페이지네이션 시작 번호", pnStart)
        let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
        console.log("현재 페이지의 페이지네이션 끝 번호",pnEnd)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
        post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
        FROM post
        JOIN dog
        ON dog.userId=post.userId
        where post.locationCategory ='${location}'
        ORDER BY post.createdAt DESC 
        LIMIT ${skipSize},${contentSize}`
        console.log(query2)
        db.query(query2, (error, results) => {
          console.log("들어오니")
          if (error) {
            console.log(error)
            // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
          }
          console.log("찐결과",results)
          if (pnEnd>pnTotal) pnEnd = pnTotal; 
          console.log(pnEnd,pnTotal)
          const result = {
            pageNum,
            pnStart,
            pnEnd,
            pnTotal,
            contents : results
          };
          res.status(200).json({
            success: true,
            posts: result,
          })
        console.log("rows는", rows)
      }); 
    });  
  }

const getSeoulForestPosts = (req, res, next) => {
    console.log("get method 연결완료!")
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum)
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize)
    const location = "서울숲"
    const query = `SELECT count(*) as count
      FROM post
      where post.locationCategory ='${location}'
      ORDER BY post.createdAt DESC `
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
        console.log("전체 글 개수",totalCount)
        const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
        console.log("페이지네이션의 전체 카운트 ",pnTotal)
        const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
        console.log("현재 페이지의 페이지네이션 시작 번호", pnStart)
        let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
        console.log("현재 페이지의 페이지네이션 끝 번호",pnEnd)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
        post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
        FROM post
        JOIN dog
        ON dog.userId=post.userId
        where post.locationCategory ='${location}'
        ORDER BY post.createdAt DESC 
        LIMIT ${skipSize},${contentSize}`
        console.log(query2)
        db.query(query2, (error, results) => {
          console.log("들어오니")
          if (error) {
            console.log(error)
            // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
          }
          console.log("찐결과",results)
          if (pnEnd>pnTotal) pnEnd = pnTotal; 
          console.log(pnEnd,pnTotal)
          const result = {
            pageNum,
            pnStart,
            pnEnd,
            pnTotal,
            contents : results
          };
          res.status(200).json({
            success: true,
            posts: result,
          })
        console.log("rows는", rows)
      }); 
    });  
  }

const getBanpoParkPosts = (req, res, next) => {
    console.log("get method 연결완료!")
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum)
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize)
    const location = "반포한강공원"
    const query = `SELECT count(*) as count
      FROM post
      where post.locationCategory ='${location}'
      ORDER BY post.createdAt DESC `
      db.query(query, (error, rows) => {
        if (error) {
          console.log(error)
          // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
          return res.sendStatus(400);
        }
        // logger.info('게시글을 성공적으로 조회했습니다.');
        const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
        console.log("전체 글 개수",totalCount)
        const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
        console.log("페이지네이션의 전체 카운트 ",pnTotal)
        const pnStart = ((Math.ceil(pageNum / pnSize) - 1) * pnSize) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
        console.log("현재 페이지의 페이지네이션 시작 번호", pnStart)
        let pnEnd = (pnStart + pnSize) - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
        console.log("현재 페이지의 페이지네이션 끝 번호",pnEnd)
        const query2 = `SELECT dog.dogId, dog.dogGender, dog.dogName, dog.dogSize, dog.dogBreed, dog.dogAge, dog.neutral, dog.dogComment, dog.dogImage, dog.userId,
        post.userId, post.postId, post.meetingDate, post.completed, post.locationCategory
        FROM post
        JOIN dog
        ON dog.userId=post.userId
        where post.locationCategory ='${location}'
        ORDER BY post.createdAt DESC 
        LIMIT ${skipSize},${contentSize}`
        console.log(query2)
        db.query(query2, (error, results) => {
          console.log("들어오니")
          if (error) {
            console.log(error)
            // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
            return res.sendStatus(400);
          }
          console.log("찐결과",results)
          if (pnEnd>pnTotal) pnEnd = pnTotal; 
          console.log(pnEnd,pnTotal)
          const result = {
            pageNum,
            pnStart,
            pnEnd,
            pnTotal,
            contents : results
          };
          res.status(200).json({
            success: true,
            posts: result,
          })
        console.log("rows는", rows)
      }); 
    });  
  }

    module.exports = {
    getAllPosts,
    getOlympicParkPosts,
    getSeoulForestPosts,
    getBanpoParkPosts
  }
