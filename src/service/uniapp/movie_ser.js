const connection = require("../../app/database");

class Movie_ser {
  /* async getMovieData(story, area, language, limit, offset) {
    if (
      story == undefined &&
      area == undefined &&
      language == undefined &&
      limit == undefined &&
      offset == undefined
    ) {
      const statement = `SELECT name,imgUrl,state FROM movie_detail`;
      const result = await connection.execute(statement);
      return result[0];
    } else {
      if (story == undefined && area == undefined && language == undefined) {
        const statement = `SELECT SQL_CALC_FOUND_ROWS,name,imgUrl,state FROM movie_detail LIMIT ? OFFSET ?;
      select FOUND_ROWS();`;
        const result = await connection.execute(statement, [limit, offset]);
        const statement1 = "select FOUND_ROWS();";
        const result1 = await connection.execute(statement1);
        const result2 = {
          total: "",
          list: [],
        };
        result2.total = result1[0][0]["FOUND_ROWS()"];
        result2.list = result[0];
        return result2;
      }

      if (story == "" && area == "" && language == "") {
        const statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail LIMIT ? OFFSET ?`;
        const result = await connection.execute(statement, [limit, offset]);
        const statement1 = "select FOUND_ROWS();";
        const result1 = await connection.execute(statement1);
        const result2 = {
          total: "",
          list: [],
        };
        //console.log(result1[0][0]["FOUND_ROWS()"]);
        result2.total = result1[0][0]["FOUND_ROWS()"];
        result2.list = result[0];
        return result2;
      } else {
        //   console.log(story,area,language, limit , offset);
        if (story == "") {
          if (language == "") {
            const statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE area = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              area,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];

            result2.list = result[0];
            return result2;
          } else if (area == "") {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
            language = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              language,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          } else {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
          language =? AND area = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              language,
              area,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          }
        } else if (area == "") {
          if (story == "") {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
          language =? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              language,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          } else if (language == "") {
            // console.log(33);
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
            type LIKE ?  LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              `%${story}%`,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          } else {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
        type LIKE ? And language = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              `%${story}%`,
              language,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          }
        } else if (language == "") {
          if (story == "") {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
          area = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              area,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          } else if (area == "") {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
            type LIKE ?  LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              `%${story}%`,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          } else {
            let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
          type LIKE ? And area = ? LIMIT ? OFFSET ?`;
            const result = await connection.execute(statement, [
              `%${story}%`,
              area,
              limit,
              offset,
            ]);
            const statement1 = "select FOUND_ROWS();";
            const result1 = await connection.execute(statement1);
            const result2 = {
              total: "",
              list: [],
            };
            result2.total = result1[0][0]["FOUND_ROWS()"];
            result2.list = result[0];
            return result2;
          }
        } else {
          let statement = `SELECT SQL_CALC_FOUND_ROWS name,imgUrl,state FROM movie_detail WHERE
          type LIKE ? And area = ? And language = ? LIMIT ? OFFSET ?`;
          const result = await connection.execute(statement, [
            `%${story}%`,
            area,
            language,
            limit,
            offset,
          ]);
          const statement1 = "select FOUND_ROWS();";
          const result1 = await connection.execute(statement1);
          const result2 = {
            total: "",
            list: [],
          };
          result2.total = result1[0][0]["FOUND_ROWS()"];
          result2.list = result[0];
          return result2;
        }
      }
    }
  }*/
  async getMovieData(message) {
    if (
      message.story == undefined &&
      message.area == undefined &&
      message.language == undefined &&
      message.limit == undefined &&
      message.offset == undefined
    ) {
      const statement = `SELECT * FROM movie_detail`
      const result = await connection.execute(statement)
      const statement1 = `SELECT COUNT(*) total FROM movie_detail`
      const result1 = await connection.execute(statement1)
      return {
        total: result1[0][0].total,
        list: result[0],
      };
    }
    if (
      message.story == undefined &&
      message.area == undefined &&
      message.language == undefined
    ) {
      const statement = `SELECT * FROM movie LIMIT ? OFFSET ?`;
      const result = await connection.execute(statement, [
        message.limit,
        message.offset,
      ]);
      const statement1 = `SELECT COUNT(*) total FROM movie_detail`;
      const result1 = await connection.execute(statement1);
      return {
        total: result1[0][0].total,
        list: result[0],
      };
    }
    let a = 'SELECT * FROM movie_detail WHERE'
    let b = ''
    let c = 'SELECT COUNT(*) total FROM movie_detail WHERE'
    for(let i in message){
      if(i!=="limit"&&i!=='offset'){
        a = a+` ${i} Like "%${message[i]}%" AND `
        c = c+` ${i} Like "%${message[i]}%" AND `
      }else if(i =='limit'){
        b = b+`LIMIT ${message[i]} `
      }
      else if(i=='offset'){
        b = b+`OFFSET ${message[i]}`
      }
    }
    const statement =`${a.slice(0,a.length-4)}${b}`
    const result = await connection.execute(statement)
    const statement1 =`${c.slice(0,c.length-4)}`
    const result1 = await connection.execute(statement1)
   
    return {
      total:result1[0][0].total,
      list:result[0]
    }
   /* if (
      message.story == undefined &&
      message.area == undefined &&
      message.language == undefined
    ) {
      const statement = `SELECT * FROM movie LIMIT ? OFFSET ?`;
      const result = await connection.execute(statement, [
        message.limit,
        message.offset,
      ]);
      const statement1 = `SELECT COUNT(*) total FROM movie_detail`;
      const result1 = await connection.execute(statement1);
      const result2 = {
        total: result1[0][0].total,
        list: result[0],
      };
      return result2;
    } else {
      if (
        message.story !== undefined &&
        message.area !== undefined &&
        message.language !== undefined &&
        message.limit !== undefined &&
        message.offset !== undefined
      ) {
        const statement = `SELECT * FROM movie_detail WHERE 
      type Like ? AND area Like ? AND language Like ?
       LIMIT ? OFFSET ?`;
        const result = await connection.execute(statement, [
          `%${message.story}%`,
          `%${message.area}%`,
          `%${message.language}%`,
          message.limit,
          message.offset,
        ]);
      }
      if (language == undefined) {
        const statement = `SELECT * FROM movie_detail WHERE 
        type Like ? AND area Like ? LIMIT ? OFFSET ?`;
        const result = await connection.execute(statement, [
          `%${message.story}%`,
          `%${message.area}%`,
          message.limit,
          message.offset,
        ]);
      }
      if (area == undefined) {
        const statement = `SELECT * FROM movie_detail WHERE 
        type Like ? AND language Like ? LIMIT ? OFFSET ?`;
        const result = await connection.execute(statement, [
          `%${message.story}%`,
          `%${message.language}%`,
          message.limit,
          message.offset,
        ]);
      }
      if (story == undefined) {
        const statement = `SELECT * FROM movie_detail WHERE 
        area Like ? AND language Like ? LIMIT ? OFFSET ?`;
        const result = await connection.execute(statement, [
          `%${message.area}%`,
          `%${message.language}%`,
          message.limit,
          message.offset,
        ]);
      }
      /* if ( 
        message.story !== undefined &&
        message.area !== undefined &&
        message.language !== undefined
      ) {
        const statement1 = `SELECT COUNT(*) total FROM movie_detail WHERE 
        type Like ? OR area Like ? OR language Like ?`;
        const result1 = await connection.execute(statement1, [
          `%${message.story}%`,
          `%${message.area}%`,
          `%${message.language}%`,
        ]);
        const result2 = {
          total: result1[0][0].total,
          list: result[0],
        };
      
        return result2;
      } 
    }*/
  }
  async getMovieDetail(limit, offset) {
    const statement = `SELECT * FROM movie_detail LIMIT ? OFFSET ?`;
    const result = await connection.execute(statement, [limit, offset]);
    return result[0];
  }
  async getMovieUrl(name) {
    const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT('num',video_num,'url',video_url)) constant
    FROM movie_videoplay WHERE detail_name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async getMovieDetailSingle(name) {
    const statement = `SELECT * FROM movie_detail WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new Movie_ser();
