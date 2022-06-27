import React from "react";
import { Context } from "../contextStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../types";
import { addUser, updateUsers, getCountries } from "../services/usersAPI";
import { Country } from "../types";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import {
  StyledMainButton,
  StyledSimpleButton,
  StyledButtonBox,
  StyledRoot,
  Text,
} from "./styled";

const StyledFormComponent = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

type Keys = (keyof User)[];
const UserKeys: Keys = ["firstName", "lastName", "email", "country", "address"];

export const AddEdit: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();
  const { users, setUsers, setSelected, selected } = React.useContext(Context);
  const [countries, setCountries] = React.useState<Country[] | null>(null);

  React.useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await getCountries();
      setCountries(countriesData);
    };
    loadCountries();
  }, []);

  React.useEffect(() => {
    if (selected) {
      UserKeys.forEach((key) => setValue(key, selected[key]));
    }
  }, [setValue, selected]);

  const onSubmit: SubmitHandler<User> = (data) => {
    if (selected) {
      const updatedUsers = users.map((obj) => {
        if (obj.id === selected.id) {
          return { ...data, id: obj.id };
        }
        return obj;
      });

      updateUsers(updatedUsers);
      setUsers(updatedUsers);
      setSelected(null);
      navigate("/");
    } else {
      const newUser = { ...data, id: new Date().getTime() };
      addUser(newUser);
      setUsers([...users, newUser]);
      navigate("/");
    }
  };

  return (
    <StyledRoot>
      <Text variant="h6">Add new user</Text>
      <StyledFormComponent onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          required
          {...register("firstName", { required: true })}
        />
        <TextField
          label="Last Name"
          required
          {...register("lastName", { required: true })}
        />
        <TextField
          type="email"
          label="Email"
          required
          {...register("email", { required: true })}
        />
        <TextField
          label="Address"
          required
          {...register("address", { required: true })}
        />
        <Autocomplete
          fullWidth
          options={countries || []}
          autoHighlight
          value={countries?.find((e) => selected?.country === e.name) || null}
          getOptionLabel={(option) => option.name || ""}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img loading="lazy" width="20" src={option.flags.svg} alt="" />
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("country", { required: true })}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        {errors.country && <span>This field is required</span>}
        <StyledButtonBox>
          <Link href="/" underline="none">
            <StyledSimpleButton variant="contained">Cancel</StyledSimpleButton>
          </Link>
          <StyledMainButton type="submit" variant="contained">
            Save
          </StyledMainButton>
        </StyledButtonBox>
      </StyledFormComponent>
    </StyledRoot>
  );
};
