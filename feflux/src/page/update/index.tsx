import { useFormik } from 'formik';
import * as yup from 'yup'
import { FormEvent, useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import { useNavigate, useParams} from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { lib } from '../../lib';
import axios from 'axios';
import Card from '../../component/Card';

interface Category {
  name?: string;
  is_active?: string;
}

const INITIAL_FORM_STATE = {
  id: '',
  name: '',
  is_active: '',
  created_at: '',
  updated_at: ''
}

const validationSchema = yup.object({
  name: yup.string().required('This field required'),
  status: yup.string().required('This field required'),
})

const Update = () => {
  const urls = lib.url
  const { token } = useGlobalContext()
  const { id } = useParams();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true)
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);


  useEffect(() => {
    
    if(load) {
      fetchData()
    }
    // console.log(initialValues)

  })
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urls}/category/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

  
      if(response.status == 201) {
        setInitialValues(response.data.data)
        setLoad(false)
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoad(false)
        console.log(error.message);
      } else {
        setLoad(false)
        console.log('Unexpected error', error);
      }
    }
  }

  const handleSubmit = (values: Category) => {
    
    console.log(values)
  
    // try {
    //   const response = await axios.post(`${urls}/category/create`, values, { 
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   });
  
    //   console.log(response)
    // } catch (err) {
    //   if (err instanceof Error) {
    //     console.log(err.message);
    //   } else {
    //     console.log('Unexpected error', err);
    //   }
    // }
  }

  const updateData = async (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const payload = {
      "id": formMik.values.id,
      "name": formMik.values.name,
      "is_active": formMik.values.is_active
    }

       try {
        setLoad(true)
        const response = await axios.put(`${urls}/category/update`, payload, { 
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if(response.status == 204) {
          setLoad(false)
          navigate('/')
        }    
      } catch (err) {
        if (err instanceof Error) {
          setLoad(false)
          console.log(err.message);
        } else {
          setLoad(false)
          console.log('Unexpected error', err);
        }
      }

  }

  const formMik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })

  return (
    <div className="container mx-auto full-width">
      <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center dark:bg-slate-800">
        <Card title={`Update Category`}>
          <form onSubmit={updateData}>
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
                  <Input name={'is_active'}
                      type='is_active'
                      value={formMik.values.is_active}
                      onChange={formMik.handleChange('is_active')}
                      status={formMik.errors.is_active && 'error'}
                  />
                  {formMik.errors.is_active && (
                      <h2 className='form-error'>{formMik.errors.is_active}</h2>
                  )}
              </div>
              <Button type={'primary'} htmlType={"submit"}  className='bg-indigo-500' loading={load}>Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Update