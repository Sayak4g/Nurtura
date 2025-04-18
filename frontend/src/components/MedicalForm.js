import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup.number().positive().integer().required('Age is required'),
  medication: yup.string().required('Medication is required'),
}).required();

function MedicalForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    alert("Medical data submitted!");
    console.log(data);
  };

  return (
    <section>
      <h2>Medical History</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" {...register('age')} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div className="form-group">
          <label>Medication</label>
          <input {...register('medication')} />
          {errors.medication && <span>{errors.medication.message}</span>}
        </div>
        <input type="submit" value="Save" />
      </form>
    </section>
  );
}

export default MedicalForm;
