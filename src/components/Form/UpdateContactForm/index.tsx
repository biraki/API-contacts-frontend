import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateContactData, updateContactSchema } from "./validator";
import { Input } from "../Input";
import { ContactContext } from "../../../providers/ContactProvider";
import { useContext } from "react";
import { UpdateContactModalContext } from "../../../providers/UpdateContactModalProvider";
import styles from "./styles.module.scss";

export const UpdateContactForm = () => {
  const { updateContact, selectedContact } = useContext(ContactContext);
  const { toggleUpdateContactModal } = useContext(UpdateContactModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateContactData>({
    resolver: zodResolver(updateContactSchema),
    defaultValues: {
      name: selectedContact?.name,
      email: selectedContact?.email,
      optionalEmail: selectedContact?.optionalEmail,
      phone: selectedContact?.phone,
      optionalPhone: selectedContact?.optionalPhone
    }
  });

  const submit = (data: UpdateContactData) => {
    updateContact(data, selectedContact!.id, toggleUpdateContactModal);
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
        label="Email Opcional"
        type="email"
        id="optionalEmail"
        placeholder="Digite seu email secundário"
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
        label="Telefone Opcional"
        type="tel"
        id="optionalPhone"
        placeholder="Digite seu telefone secundário"
        {...register("optionalPhone")}
      />
      {errors.optionalPhone && <p>{errors.optionalPhone.message}</p>}
      <button type="submit" className={styles.button1}>Editar</button>
    </form>
  );
};
