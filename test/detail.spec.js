// const { add_post } = require('./detail_function');

// test('테스트가 성공하는 상황', () => {
//     expect(add_post('게시물이 성공적으로 게시 되었어요!')).toEqual(false);
// });

// test('테스트가 실패하는 상황', () => {
//     expect(add_post('my-email@domain.com')).toEqual(true);
// });

//요구한 사항

const {add} = require('./detail_function');
test ("2+5는 7이다", () => {
    expect(add(2,5)).toBe(7);
})

const {add_post} = require('./detail_function');
test ( "만나는날짜, 코멘트, 장소, 위도, 경도는 ~이다", () =>{
    expect(add_post(11,11,11,11,11,11,11)).toBe("11,11,false,11,11,11,11,1")
});