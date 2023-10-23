import { useFormik } from 'formik';
import * as yup from 'yup'
import Card from '../../component/Card';
import { Button, Input } from 'antd';
import axios from 'axios';
import { lib } from '../../lib';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';



interface Category {
  name?: string;
  status?: string;
}

const initialValues = {
  name: '',
  status: ''
}

const validationSchema = yup.object({
  name: yup.string().required('This field required'),
  status: yup.string().required('This field required'),
})



const Category = () => {
  const {loading, token, setLoading } = useGlobalContext()
  const navigate = useNavigate();

  const handleSubmit = async (values: Category) => {
    const urls = lib.url
    setLoading(true)  
    try {
      const response = await axios.post(`${urls}/category/create`, values, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      // console.log(response)
      if(response.status == 201) {
        setLoading(false)
        navigate('/')
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

  return (
    <div className="container mx-auto full-width">
      <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center dark:bg-slate-800">
        <Card title={`Add Category`}>
          <form onSubmit={formMik.handleSubmit}>
              <div>
                  <h4 className='form-title'>Category</h4>
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
                  <h4 className='form-title'>Status</h4>
                  <Input name={'status'}
                      type='status'
                      value={formMik.values.status}
                      onChange={formMik.handleChange('status')}
                      status={formMik.errors.status && 'error'}
                  />
                  {formMik.errors.status && (
                      <h2 className='form-error'>{formMik.errors.status}</h2>
                  )}
              </div>
              <Button type={'primary'} htmlType={"submit"}  className='bg-indigo-500' loading={loading}>Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Category