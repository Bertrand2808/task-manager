import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date as dd/MM/yyyy by default', () => {
    const date = new Date('2022-01-01');
    const formattedDate = pipe.transform(date);
    expect(formattedDate).toEqual('01/01/2022');
  });

  it('should format date as MM/dd/yyyy', () => {
    const date = new Date('2022-01-01');
    const formattedDate = pipe.transform(date, 'MM/dd/yyyy');
    expect(formattedDate).toEqual('01/01/2022');
  });

  it('should format date as yyyy-MM-dd', () => {
    const date = new Date('2022-01-01');
    const formattedDate = pipe.transform(date, 'yyyy-MM-dd');
    expect(formattedDate).toEqual('2022-01-01');
  });
});
