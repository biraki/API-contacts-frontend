import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateContactData, addContactSchema } from "./validator";
import { Input } from "../Input";
import { ContactContext } from "../../../providers/ContactProvider";
import styles from "./styles.module.scss";
import { useContext } from "react";

export const AddContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const { toggleAddContactModal } = useContext(ContactContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactData>({ resolver: zodResolver(addContactSchema) });

  const submit = (data: CreateContactData) => {
    addContact(data);
    toggleAddContactModal()
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form1}>
      <Input
        className={styles.input1}
        label="Nome Completo"
        type="text"
        id="name"
        placeholder="Digite seu nome completo"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        className={styles.input1}
        label="E-mail"
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        className={styles.input1}
        label="Email secundário"
        type="email"
        id="optionalEmail"
        placeholder="Opcional"
        {...register("optionalEmail")}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        className={styles.input1}
        label="Telefone"
        type="tel"
        id="phone"
        placeholder="(41)888888888"
        {...register("phone")}
      />
      {errors.phone && <p>{errors.phone.message}</p>}
      <Input
        className={styles.input1}
        label="Telefone secundário"
        type="tel"
        id="optionalPhone"
        placeholder="Opcional"
        {...register("optionalPhone")}
      />
      {errors.optionalPhone && <p>{errors.optionalPhone.message}</p>}
      <button type="submit" className={styles.button1}>Cadastrar</button>
    </form>
  );
};
