import Controller from './lib/controller';
import nunjucks from 'nunjucks';

function getName(request) {
  // default values
  let name = {
    fname: 'Rick',
    lname: 'Sanchez'
  };

  // split path params
  let nameParts = request.params.name ? request.params.name.split('/') : [];

  // order of precedence
  // 1. path param
  // 2. query param
  // 3. default value
  name.fname = (nameParts[0] || request.query.fname) || name.fname;
  name.lname = (nameParts[1] || request.query.lname) || name.lname;

  return name;
}

export default  class HelloController extends Controller {
  toString(callback){
    // read template and compile using context object
    nunjucks.renderString('<p>hello {{fname}} {{lname}}</p>', getName(this.context), (err, html) => {
      if(err) {
        return callback(err, null);
      }
      callback(null, html);
    });
  }
}
