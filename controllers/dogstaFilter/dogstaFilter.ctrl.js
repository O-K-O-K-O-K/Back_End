"use strict";
const { db } = require("../../models/index");

const getMainFilter = async (req, res) => {
  const query = `SELECT *,
    (SELECT COUNT(*) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
     FROM dogSta 
     JOIN user
     ON dogSta.userId = user.userId
     LEFT JOIN dog
     ON dog.userId = user.userId
     ORDER BY dogSta.createdAt DESC
     LIMIT 10`;

  console.log("query", query);

  await db.query(query, (error, rows) => {
    if (error) {
      return res.status(400).json({
        success: false,
        msg: "메인 조회하기 실패",
      });
    }
    return res.status(200).json({
      success: true,
      posts: rows,
    });
  });
};

const getLikeFilter = async (req, res) => {
  try {
    console.log("get method 연결완료!");
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum);
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize);
    const query = `SELECT count(*) as count FROM dogSta ORDER BY dogSta.createdAt DESC `;
    db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
        return res.sendStatus(400);
      }
      const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
      console.log("전체 글 개수", totalCount);
      const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
      console.log("페이지네이션의 전체 카운트 ", pnTotal);
      const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
      console.log("현재 페이지의 페이지네이션 시작 번호", pnStart);
      let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
      console.log("현재 페이지의 페이지네이션 끝 번호", pnEnd);
      const likeQuery = `SELECT *, (SELECT COUNT(likes.dogPostId) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
      FROM dogSta 
      JOIN user
      ON dogSta.userId = user.userId
      LEFT JOIN dog
      ON dog.userId = user.userId
      ORDER BY count DESC
      LIMIT ${skipSize},${contentSize}`;
      console.log(likeQuery);
      db.query(likeQuery, (error, rows) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            msg: "메인 조회하기 실패",
          });
        }
        console.log("찐결과", rows);
        if (pnEnd > pnTotal) pnEnd = pnTotal;
        console.log(pnEnd, pnTotal);
        const result = {
          pageNum,
          pnStart,
          pnEnd,
          pnTotal,
          contents: rows,
        };
        res.status(200).json({
          success: true,
          posts: result,
        });
        console.log("rows는", rows);
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
};

const getRecentFilter = async (req, res) => {
  try {
    console.log("get method 연결완료!");
    const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
    console.log(pageNum);
    const contentSize = 10; // NOTE: 페이지에서 보여줄 컨텐츠 수.
    const pnSize = 10; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    console.log("다음 페이지 갈 때 건너뛸 리스트 개수.", skipSize);
    const query = `SELECT count(*) as count FROM dogSta ORDER BY dogSta.createdAt DESC `;
    db.query(query, (error, rows) => {
      if (error) {
        console.log(error);
        // logger.error('게시글 조회 중 DB관련 에러가 발생했습니다', error);
        return res.sendStatus(400);
      }
      const totalCount = Number(rows[0].count); // NOTE: 전체 글 개수.
      console.log("전체 글 개수", totalCount);
      const pnTotal = Math.ceil(totalCount / contentSize); // NOTE: 페이지네이션의 전체 카운트
      console.log("페이지네이션의 전체 카운트 ", pnTotal);
      const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
      console.log("현재 페이지의 페이지네이션 시작 번호", pnStart);
      let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
      console.log("현재 페이지의 페이지네이션 끝 번호", pnEnd);
      const likeQuery = `SELECT *,
    (SELECT COUNT(likes.dogPostId) FROM likes WHERE likes.dogPostId = dogSta.dogPostId) as count
     FROM dogSta 
     JOIN user
     ON dogSta.userId = user.userId
     LEFT JOIN dog
     ON dog.userId = user.userId
     ORDER BY dogSta.createdAt DESC
     LIMIT ${skipSize},${contentSize}`;
      console.log(likeQuery);
      db.query(likeQuery, (error, rows) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            msg: "메인 조회하기 실패",
          });
        }
        console.log("찐결과", rows);
        if (pnEnd > pnTotal) pnEnd = pnTotal;
        console.log(pnEnd, pnTotal);
        const result = {
          pageNum,
          pnStart,
          pnEnd,
          pnTotal,
          contents: rows,
        };
        res.status(200).json({
          success: true,
          posts: result,
        });
        console.log("rows는", rows);
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "로그인 하세요",
    });
  }
};

module.exports = {
  getMainFilter,
  getLikeFilter,
  getRecentFilter,
};
