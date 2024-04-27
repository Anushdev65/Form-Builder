import { expiryIn, secretKey, tokenTypes } from "../config/config.js";
import { generateToken } from "../utils/token.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import { throwError } from "../utils/throwError.js";
import tryCatchWrapper from "../middlewares/tryCatchWrapper.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { userService, tokenService } from "../services/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";

export const createUser = tryCatchWrapper(async (req, res) => {
  const body = { ...req.body };
  let email = body.email;

  let passHashedPassword = await hashPassword(req.body.password);

  let user = await userService.detailSpecificUserByAny({ email });

  if (user) {
    throwError({
      message: "Duplicate Email",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    const data = await userService.createUserService({
      body: {
        email: body.email,
        password: passHashedPassword,
        userName: body.userName,
      },
    });

    let infoObj = { userId: data._id };
    let token = await generateToken(infoObj, secretKey, expiryIn);
    console.log(user);
    console.log(token);

    let tokenData = {
      token: token,
      userId: data._id,
      type: tokenTypes.ACCESS,
      expiration: getTokenExpiryTime(token).toLocaleString(),
    };

    await tokenService.createTokenService({ data: tokenData });

    successResponseData({
      res,
      message: "User created successfully.",
      statusCode: HttpStatus.CREATED,
      data,
      token,
    });
  }
});

export let loginUser = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await userService.detailSpecificUserByAny({ email });
  if (user === null) {
    throwError({
      message: "Please enter valid email or password.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    let isValidPassword = await comparePassword(password, user.password);
    if (isValidPassword) {
      let infoObj = { userId: user._id };
      let token = await generateToken(infoObj, secretKey, expiryIn);

      console.log(token);

      let data = {
        token: token,
        userId: user._id,
        type: tokenTypes.ACCESS,
        expiration: getTokenExpiryTime(token).toLocaleString(),
      };

      await tokenService.createTokenService({ data });

      console.log(data, "tokenn oken");

      successResponseData({
        res,
        message: "Login Successfully.",
        statusCode: HttpStatus.OK,
        data: {
          token: token,
          user: user,
        },
      });
    } else {
      throwError({
        message: "Please enter valid email or password.",
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
});

export let logoutUser = tryCatchWrapper(async (req, res) => {
  await tokenService.deleteSpecificTokenService({ id: req.token.tokenId });

  successResponseData({
    res,
    message: "Logout Successfully.",
    statusCode: HttpStatus.OK,
  });
});

export const myProfile = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let data = await userService.detailSpecificUserService({ id });
  console.log(data);
  successResponseData({
    res,
    message: "Profile read sucessfully.",
    statusCode: HttpStatus.OK,
    data,
  });
  console.log(data, "user user suer");
});

export let updateUserPassword = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let oldPassword = req.body.oldPassword;
  let password = req.body.password;

  let user = await userService.detailSpecificUserService({ id });

  let isOldPasswordMatches = await comparePassword(oldPassword, user.password);

  if (!isOldPasswordMatches) {
    throwError({
      message: "Password does not matches.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  let isPreviousCurrentPasswordSame = await comparePassword(
    password,
    user.password
  );

  if (isPreviousCurrentPasswordSame) {
    throwError({
      message: "Previous and current password are same.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  let body = {
    password: await hashPassword(password),
  };

  let data = await userService.editSpecificUserService({ id, body });
  delete data._doc.password;
  await tokenService.deleteAllTokenOfAUser({ userId: id });

  successResponseData({
    res,
    message: "User password updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificAuthUser = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await userService.deleteSpecficUserService({ id });
  if (data) {
    delete data._doc.password;
    successResponseData({
      res,
      message: "Read user successfully.",
      statusCode: HttpStatus.OK,
      data,
    });
  } else {
    throwError({
      message: "Could'nt found user.",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
});
