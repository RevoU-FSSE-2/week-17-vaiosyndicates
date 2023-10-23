import { useFormik } from 'formik';
import * as yup from 'yup'
import { 
  Input, 
  Button,
  message, 
} from 'antd';
import { useNavigate} from 'react-router-dom';
import Card from '../../component/Card';
import { useGlobalContext } from '../../context';
import axios from "axios";
import { lib } from '../../lib';

interface RegisterType {
  name: string;
  password: string;
  email: string;
}

const initialValues = {
  name: '',
  password: '',
  email: '',
}

const validationSchema = yup.object({
  name: yup.string().required('This field required'),
  email: yup.string().required('This field required').email('Invalid format email'),
  password: yup.string().required('This field required')
                     .min(8, 'Password is too short - should be 8 chars minimum.')
                     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const [load, setLoad] = useState<boolean>(true)
  const navigate = useNavigate();
  const { loading, setLoading } = useGlobalContext()
  const urls = lib.url

  const handleSubmit = async (values: RegisterType) => {
    setLoading(true)
    try {
      const response = await axios.post(`${urls}/user/register`, values, { 
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      // console.log(response.status)
      if(response.status == 201) {
        setLoading(false)
        success()
        navigate('/')
      } else {
        setLoading(false)
        error()
      }
    
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        error()
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success Register',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Error',
    });
  };

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  return (
    <>
      {contextHolder}
      <div className="container mx-auto full-width">
        <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center dark:bg-slate-800">
          <Card title={`REGISTER`}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <h4 className='form-title'>name</h4>
                    <Input name={'name'}
                        value={formMik.values.name} 
                        onChange={formMik.handleChange('name')}
                        status={formMik.errors.name && 'error'}
                    />
                    {formMik.errors.name && (
                        <h2 className='form-error'>{formMik.errors.name}</h2>
                    )}
                </div>
                <div>
                    <h4 className='form-title'>Email</h4>
                    <Input name={'email'}
                        type='email'
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
                <Button type={'primary'} htmlType={"submit"}  className='bg-indigo-500' loading={loading}>Submit</Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Register