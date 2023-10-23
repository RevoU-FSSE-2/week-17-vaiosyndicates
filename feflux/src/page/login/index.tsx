import { useFormik } from 'formik';
import * as yup from 'yup'
import { Input, Button } from 'antd';
import Card from '../../component/Card';
import axios from "axios";
import { useGlobalContext } from '../../context';
import { useNavigate} from 'react-router-dom';
import { lib } from '../../lib';


interface LoginType {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = yup.object({
  email: yup.string().required('This field required').email('Invalid format email'),
  password: yup.string().required('This field required')
                     .min(8, 'Password is too short - should be 8 chars minimum.')
                     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

const Login = () => {
  const urls = lib.url
  const navigate = useNavigate();
  const { setLoading, setToken } = useGlobalContext()

  const handleSubmit = async (values: LoginType) => {
    // console.log(values)
    try {
      const response = await axios.post(`${urls}/user/login`, values, { 
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if(response.status == 200) {
        setLoading(false)
        localStorage.setItem("token", JSON.stringify(response.data.data.token) )
        setToken(response.data.data.token)
      } else {
        setLoading(false)
      }

    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  const register = () => {
    navigate('/register')
  }


  return (
    <div className="container mx-auto full-width">
      <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center dark:bg-slate-800">
        <Card title={`LOGIN`}>
          <form onSubmit={formMik.handleSubmit}>
              <div>
                  <h4 className='form-title'>email</h4>
                  <Input name={'email'}
                      value={formMik.values.email} 
                      onChange={formMik.handleChange('email')}
                      status={formMik.errors.email && 'error'}
                  />
                  {formMik.errors.email && (
                      <h2 className='form-error'>{formMik.errors.email}</h2>
                  )}
              </div>
              <div>
                  <h4 className='form-title'>Password</h4>
                  <Input name={'password'}
                      type='password'
                      value={formMik.values.password}
                      onChange={formMik.handleChange('password')}
                      status={formMik.errors.password && 'error'}
                  />
                  {formMik.errors.password && (
                      <h2 className='form-error'>{formMik.errors.password}</h2>
                  )}
              </div>
              <Button type={'primary'} htmlType={"submit"}  className='bg-indigo-500'>Submit</Button>
              <Button type={'primary'} htmlType={"button"}  className='btn-register' onClick={register}>Register</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login