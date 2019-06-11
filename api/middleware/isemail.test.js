const isemail = require('./isemail');

test('check if email is valid', () => {
    expect(isemail('test@test.com')).toBe(true);
  });

