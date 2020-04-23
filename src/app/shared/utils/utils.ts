export class Utils {

    public static renderLongNumbers(n: number) {
        let str = n.toString(10);
        let newStr = '';
        let remainder = str.length % 3;
        let i = remainder;
        if (remainder !== 0) {
          newStr = newStr + str.substring(0, remainder) + "'";
        }
        for (i; i < str.length; i += 3) {
          newStr += str.substring(i, i + 3);
          if ((str.length - i) <= 3 ) {
            continue;
          }
          newStr += "'";
        }
        return newStr;
      }
}
