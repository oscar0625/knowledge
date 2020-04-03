var superDog = {
    //状态码
    reportStatus: function (status) {
        var text = "Unknown status code";
        switch (status) {
            case 0:
                text = "Success";
                break;
            case 1:
                text = "Request exceeds data file range";
                break;
            case 3:
                text = "System is out of memory";
                break;
            case 4:
                text = "Too many open login sessions";
                break;
            case 5:
                text = "Access denied";
                break;
            case 7:
                text = "Required SuperDog not found";
                break;
            case 8:
                text = "Encryption/decryption data length is too short";
                break;
            case 9:
                text = "Invalid input handle";
                break;
            case 10:
                text = "Specified File ID not recognized by API";
                break;
            case 15:
                text = "Invalid XML format";
                break;
            case 18:
                text = "SuperDog to be updated not found";
                break;
            case 19:
                text = "Invalid update data";
                break;
            case 20:
                text = "Update not supported by SuperDog";
                break;
            case 21:
                text = "Update counter is set incorrectly";
                break;
            case 22:
                text = "Invalid Vendor Code passed";
                break;
            case 24:
                text = "Passed time value is outside supported value range";
                break;
            case 26:
                text = "Acknowledge data requested by the update, however the ack_data input parameter is NULL";
                break;
            case 27:
                text = "Program running on a terminal server";
                break;
            case 29:
                text = "Unknown algorithm used in V2C file";
                break;
            case 30:
                text = "Signature verification failed";
                break;
            case 31:
                text = "Requested Feature not available";
                break;
            case 33:
                text = "Communication error between API and local SuperDog License Manager";
                break;
            case 34:
                text = "Vendor Code not recognized by API";
                break;
            case 35:
                text = "Invalid XML specification";
                break;
            case 36:
                text = "Invalid XML scope";
                break;
            case 37:
                text = "Too many SuperDog currently connected";
                break;
            case 39:
                text = "Session was interrupted";
                break;
            case 41:
                text = "Feature has expired";
                break;
            case 42:
                text = "SuperDog License Manager version too old";
                break;
            case 43:
                text = "USB error occurred when communicating with a SuperDog";
                break;
            case 45:
                text = "System time has been tampered with";
                break;
            case 46:
                text = "Communication error occurred in secure channel";
                break;
            case 50:
                text = "Unable to locate a Feature matching the scope";
                break;
            case 54:
                text = "The values of the update counter in the file are lower than those in the SuperDog";
                break;
            case 55:
                text = "The first value of the update counter in the file is greater than the value in the SuperDog";
                break;
            case 400:
                text = "Unable to locate dynamic library for API";
                break;
            case 401:
                text = "Dynamic library for API is invalid";
                break;
            case 500:
                text = "Object incorrectly initialized";
                break;
            case 501:
                text = "Invalid function parameter";
                break;
            case 502:
                text = "Logging in twice to the same object";
                break;
            case 503:
                text = "Logging out twice of the same object";
                break;
            case 525:
                text = "Incorrect use of system or platform";
                break;
            case 698:
                text = "Requested function not implemented";
                break;
            case 699:
                text = "Internal error occurred in API";
                break;
            case 802:
                text = "Parameter error";
                break;
            case 803:
                text = "Verify password failed";
                break;
            case 804:
                text = "Modify password failed";
                break;
            case 810:
                text = "Password's length is wrong";
                break;
            case 811:
                text = "Name's length is wrong";
                break;
            case 812:
                text = "Info's length is wrong";
                break;
            case 813:
                text = "Name's length is wrong";
                break;
            case 814:
                text = "Parameter error";
                break;
            case 820:
                text = "Hardware internal error!";
                break;
            case 821:
                text = "Parameter error";
                break;
            case 822:
                text = "Need to verify Password";
                break;
            case 823:
                text = "Verify password failed";
                break;
            case 824:
                text = "Need to initialize";
                break;
            case 825:
                text = "Password has been locked";
                break;
            case 831:
                text = "Verify password failed, you still have 14 chances";
                break;
            case 832:
                text = "Verify password failed, you still have 13 chances";
                break;
            case 833:
                text = "Verify password failed, you still have 12 chances";
                break;
            case 834:
                text = "Verify password failed, you still have 11 chances";
                break;
            case 835:
                text = "Verify password failed, you still have 10 chances";
                break;
            case 836:
                text = "Verify password failed, you still have 9 chances";
                break;
            case 837:
                text = "Verify password failed, you still have 8 chances";
                break;
            case 838:
                text = "Verify password failed, you still have 7 chances";
                break;
            case 839:
                text = "Verify password failed, you still have 6 chances";
                break;
            case 840:
                text = "Verify password failed, you still have 5 chances";
                break;
            case 841:
                text = "Verify password failed, you still have 4 chances";
                break;
            case 842:
                text = "Verify password failed, you still have 3 chances";
                break;
            case 843:
                text = "Verify password failed, you still have 2 chances";
                break;
            case 844:
                text = "Verify password failed, you still have 1 chance";
                break;
            case 845:
                text = "Password has been locked";
                break;
            case 901:
                text = "Authenticate failed";
                break;
            case 902:
                text = "Generate challenge string failed";
                break;
            case 903:
                text = "Name is illegal";
                break;
            case 904:
                text = "Please enter your password";
                break;
            case 905:
                text = "Password's length should be between 6-16 characters";
                break;
            case 906:
                text = "Password is illegal";
                break;
            case 907:
                text = "Please enter your user name";
                break;
            case 908:
                text = "Please enter your confirm password";
                break;
            case 909:
                text = "Confirm password's length should be between 6-16 characters";
                break;
            case 910:
                text = "Password is illegal";
                break;
            case 911:
                text = "Passwords do not match";
                break;
            case 912:
                text = "Please enter your current password";
                break;
            case 913:
                text = "Please enter your new password";
                break;
            case 914:
                text = "Name length should be between 1-32 characters";
                break;
            case 915:
                text = "The SuperDog has been registered";
                break;
            case 916:
                text = "no dog_auth_srv in java.library.path";
                break;
            case 917:
                text = "Fail to get challenge";
                break;
            case 918:
                text = "Fail to get challenge";
                break;
            case 919:
                text = "Cannot find session file! Please confirm you have created session folder and set the folder path!";
                break;
            case 920:
                text = "Fail to load the library: dog_auth_srv_php.dll! Please confirm that your configuration file is right.";
                break;

        }
        return text
    },
    //获取认证代码
    getAuthCode: function () {
        return "AQAAAIguMAChcOy7QFxW2T8w71bt3dUc3H3GKqbpYDme8UVhYEwgnSFliVg2Fpexdk60JQRAhxvUzkqtiT6CoyhWFoNOCEYwXIlIb9O/q+Lz/ih/0tcDUj0v35v4d7ILu7G4V1ZjdATiFMqFU8MYUU0gwphGLarMbXCAd+VuYwNWYWpvr+3Xz0BienUf/BIy4H3pf+m8KG9XwD20T6679enXFAKTuQlg6WCKTm06ITLWkPde6wrcTbLU1Lj5PGxZ0XmDKveaFTWUhDVTFhCilwZQB0x6Ckbq+yvzDksVqzB/RFEdNlXGPMsjNguLw/HYAuI0j1aFdBvCsTRsor6FScGKJqpjpNgDIN0Fp+W2jJstSVNUS/C9pZSDHOwcjx19n16Frq0EM5iGlpC65FW6x6wFQ5AX48nykVx069L7407lPNWd6ubxa4yBDIBZVDB/vyVJl7apo4OHsQeYNykEf+ia658vF3TWzSgPbl9bM9ijaySH7kL7WRUknd8O0NncLP4YcBQFThaf1TyFAXf2AiRsKF0SfANadKFtKK5kH31tqzXz4qJ7d/1d6L6jOe9intjNP2YbwywUvD5mKIf//NJdbCiWKJKorLMsHhNdNEVc6TMvNa8tTf2GPHlcjI/6QIxiQG9wBMUCjdbLFDqktMYclYD6xX3SHeAuPRul6YSdQZjrUhEUct6uBgDzB9pAQ9X5NuIodlU3HnbuDh6lOn6+pZ7ubK3sMFIiUJGLd7WWVRLFz9iZbEok321ZKf7aYiEVKnlU4IZydv7ySP6jgg0LhxipD3iGSFu0Pu6MC3EgFb1MD3FXdtpVT83/0MT2XrB69sHFLm/JJE5zNM1I0cMnC/rn+A0q8St0XHuDeI55Nwhwe8CvsqcmXLFDi5RkHjDFpUFRxFW+0myeg44TFs0vq5Vs+khfzkG7xv+q2+KPy7sYwDjMgx8yFfZIPogq4yc9T0ZBpb+W5ebRQUKsPBj8Jpew19d9C1q3Yfev4KQF6hFRxztJc6hLVvn0iBpw9tLouLpUu+xgUl2pzJGxzdz4+zUBj3KGKvUJ32V+OnyidCliUR4dJBtaUeYdeikoSRVRB45IwgAQ3/Hzro7udoUcVdcYgexc7jaXEC9fBc1VQFiYFV/+ahs0lgXPIloUEUKCTIRZFFna3M/fhq90MqlqKpbRrEfBxGJBZTQ1LuF/1AJDxWBhSJr9RJpAbojYEINbtNjD3/IHaOB5/5sMe7TAn6uLi13dHsX++NCrwSbV+/d4YK7ukfdl5jXDfa6v4fPaCdOpJnOYwdYpWh79yZuIuCdG1MGlyw+Q37E+7JRVMMO7VKkn7AS56/u9pY4DZlfNqfauxl+LMGBnINofde6SA9OvwyjMKeGQDwOFsewAnCagEzTZk7kGHbtbsbAUXGlIhnOdNRVMvpl6lQCtbEOihSAK0FjSaeMCnZjIyopksIdXoBhHjvRWrN8YCm6HkyIDcORhKv/VXg5Edmq3dqufCmwEs+TCFa6jU4ZM4FaF8J7SXH3CA3fByBlotQZb/eL3go9Ms3E2tRC+N+WbwtMLSUEWU7P22LG7aBgrDVhYWz8MPs0avJm1KIRnVjHD7PzddH3V8QRSpnT2vKbeEfniwVwjmmOGfvwC5zF3vVyEgcV8+ph4637CAgGgcYAJ8ZNsM7iRYCc2q51zpF6OwFKTkQa4oqNtEojASt7DtdnAJVFFOLQHVdGkvHwoB89Wz9hqhMUNzdQvcO++0vBShgIXGlTz526opT3eyZbwQASbnlF3q/cgNeykKkx0nHih/Puv7GL30n1SF8s8OS5OdxwLs2tYK7IlnxUhT4l+hpD34Z4+Z3bz2VhVLftp155Gm2Y2oNRdQaoOpgVu/cftfHTnZqiQm2T6Q7iSsWNnim46XJUmw2xWgsrSnsWgVeLDLwdzvP0HSEEM4emkfr+GFYTuND9aRUNhep2j/ICLexVeiv/pu5JiX0Bf6wx6or7mj51IooltYd4XkeRWhP22ISVxol1Pdyk6WkzVe6pcpidP6+SluO1lGeJR6TrEgTAljq7QIrBrWhgaS3sLW10F3x65ay8iux9FKlol65iGtD7YucjR58LMYT0QaeRPwgP17RbvgOeOq2NjGbnFD3lBe+Vem+wHL40cigwXu5JMbm5F08WZFFi4U4Dy83bhhHnXbESH7/JxFVJByzw3KgRigrmBUsuBaI6qSrJqA7GmUXH/gO52yZCpQU37mP5REMi4FmLknZg+WKwABylRD8kgneCo2ggJWBEiGxw9oqO/352EHTP8wDMClpGQmemaIlsYqUI9DUNFJOlQIv83zHTtHMv6vj5yCP80xmKswYIolrXzGl3rEZQrTathgcQRqT3G8UWVUKbynnWkLEe4ca7sHvuD0s8RxCn0wwR0bb7fHscuq06AQAhHnBcr8vTnDLHpFv7y4610q/vWSccaIy1moqMxjpLbAIxUsvCT5MRUyr/2CiAcGLCD5UtuiHO6IDii+hw0yToPYaNdUpihe4EHGRrsitGNai3L+wm9sD0EuP48EzSNcpsvoBDpy60dgXFdrfUqJOY/jy4geyt7HT5ihJ+oUx/ejKHNr4QT79TwUh3lJeu1mYU+Knv7FngWEuP1gg2o3n7Sq40PedJ2R7GdzMQGxBfntD2ZfOGatWk5nY/M4igOB8f5pneWpRuuKOxrInWNsCQRw/EKe/njFbgSSxgg5IiyKYN7/Ok5RHblwxM1V34TZ0dZr+f7mxk5iNHwkEWPuQjd0ueu/yFc7TaiMSfD8bdX6G4vzUVPscHsRDLfunyMfEt7cXiCS/nFA4KL1DwH3oZNPWP/KRjIlqcUFDQ7djksnArBXueInV911UiOPs0qe/qGh7WiWghuMXBGgBjFCWlJ5C9X7MvFRd5x0lVBHGpEH+dcJx7adpKCDXuSsgRaDRoiMkHAptrb9fve7+xziihByuiWHYbvfaPLf5vkkGRv7EQAAG0E2XLp2c/DbEY69g1xXNGUc8BojRZTCSWFa2CDJbKe69myaSFzUPgs/MKjmZVnuGa731Jt2cNjSSqz3cnU7iNjtQpq9TQASSoubohq3B4Wq6ntPxscDeCzrX/dmeJGErugfZE3MUDldhHnKACaFR0sQYzYGH5sPTSBF/6LCBtdSkIbzuM4ip5MzBPbWGzd6VLNLtZPcBpU+aNgfJKf4P2tgTy4pvv5pw84Q6cBG72ZIbjdjz/fhzLTxrjjjhCT9jCjkZyid9sW7A9rvMX94d+c7IxIH2d9GIOKf11v0GFgD5dofVAutL/gRHDv4V/UCKaMXpZ1r2hzjpI9DlCjYvW2V2RvZoBg4Sk/1g77w7U2pefsrPS1PBs0gXyTqqKwgiuBLNiSCymod3YwIUXvbWopOJQyAfkfD3//ENHv+XkG2qScxezbfsvIzCr2US/c5hfXsbaJne6qNZqx5hZtu0U4mmjmbO91Xp1PQL8ULaj2x5saMtbTKT3UfP926hKK/R/E4HjkyD9YdaRjHj9zf16n1buV419gt4vIUMXgJ/W9KZC1Xd3OBzo9sYJKRHvA6O0imFYiw4B2+enLVmOzM5+ofVaIb4JUHrVl6oQUK9VHnwZ+mEawb6G0IyVM3Yw8fv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mX7/u6UNF9auU2/4tNoSfJl+/7ulDRfWrlNv+LTaEnyZMEY846EpOMozGPWD1mb7nf3a0gGPtSyhWfd9B2u4Q619bRe22EVeFCmWttJLIapJ1bTzpLCLC5henLQvD/gvG37/u6UNF9auU2/4tNoSfJlblbHVlqEGHWelVKEgGVEWQIlKCYzL4WeEB30W48cApsrfr0HC3aEcpzD+4jotP7GlK2mXGDGy2gzDhStF/JCzVYdrt4pjCJIjvvukPpRdMg33BH4oV3ylW2xF0j2wp7AY6exwo4eC1dt/rqUDUi+yfv+7pQ0X1q5Tb/i02hJ8mWjQsb6oC7sRowX6tOe9346/T6vgNR39yTVqENjAIFW7qf+AgC5izF798GJZCBtvkN+9/xK1IFP7T9LuyHtMo1lopc0me0GArUyiAK65SFRvcQcowRy27DA+PbzunMuq7/tBqB3IWbeEPnfl6Dcxb3Eb96ZVVxHGmZbjRoqLu7SEUFS90M24h2D2uDJLp9IQISF8L8zaVp/xSwvtYtSuIm3MnpKcsFf8UyGBUyKt++fqmvninHAUB4caG6ekibejeYGPyrw//TXf4atkfwBzJiURoawjRS8rmKRcYXlWq+tZGq8avNK+vS2+ppTKFzqKwcT9qoGDuCEMb8fC9BZlyPF+/7ulDRfWrlNv+LTaEnyZfv+7pQ0X1q5Tb/i02hJ8mQhL1Vk9482PiHz05I0ZTwdvIcnmE7cya0tTuKZglJuPBseOeUEd1OkjQp0yo1B3NxdOeN519N6/xOJ/yI0oj4cow0HC0KIHTdykXi5ndtLdjQeedTlSHDYpNPBJQ8EEHB4R3Q0i/TIJcuq0wPFrCvxQjqFOcr4sdk03IqNwxRS92sBIw94JWATP6U3q8RlU9Wm3f0+qwPqyfwMpCIXxRyL4C8C/EkQfhiKxsPJADDxDfv+7pQ0X1q5Tb/i02hJ8mf+c7/cwgOAEaReJuQWoyTuW/Y9fZ7x5Yb0onRtmaI1kU/Mp2xotBl7YK2odwiDN/n4uKP4aEWORDCaXM+BbLebBLCUKbSUcC/nPfrwTxCjng5kYCU+d8eJPc1FYaeByPTwGkLZ31SmvtXBnM12H6gxZn4RYrQ4FUVqa7+F3Hyi8raVgN94VjivOHXxm7Ss9CnAqGnfZZlNGXUdiqN4LnPUNMwb2CkBQY/2LMputkFROm319EuqfUed9hdR2XhSdg/IyiA1CChsu2HcmYGxhFesmzXehH4ATvV+wtGt+KHVa3ygSh4UESbWVAgFDyLdG0qZZCXCiCqMXcgzozv2nWyKbTpUP6svwRwX+AxVX1E5H/toh7CFluEJ+77ebpb9//kB1+ruJhQZbF2VPg5xsz7DsUZsZSj4jes4eO7N3S0q23UqcXIoMrFulWKkxENAb5vdhcBOC6o1qe6pFZUdQ2KpzJtIWwhsJ9FGm5SN9i1GUAN75c70TDEQo4pmRjaXABqgLowdOJGRP3844ulC2QLCV/tpwvf1Y0lCice8TCwo8Rr0ESgiQWKrLODBE7bVX/Y/SYfQXY5idof2m3hzkTLDiEq+TvsFQ9RhDmsm4yU9kXg80f2ZgJsEfiFzTN3C/45l1vHyZpBqsakD56ZQkuv11Uwbry14mtMA2GDZ0EP1bqiBpkMvYVTTMc7JALQZmvxVvRSR9MPx6NPOQmVyAK57u5iIioX4XAdC0e9dP9vANxWGoGjtWLa2gqsE1Nz9kor3K+YMjIrM31FTMMd14wlphWkwlHu7WS1cMFkzVkaZU65LfgSX28kDgPIyzae2B2G7jZ7lRdyBL2KgBV1aw9uRmTSa4nfg/qamcCaknnMPMmGUM6Y/9vcJdOM6dXANIzh+SdVzxlubFtQsH47/a4nQLgx9haeFU48JtzliICEPi3LdOckozYBfsyDti/q0Mb+s+yZSASNETDPrCCcKupJV9oyLd9w5o818MILY7UnP3FY8KI/JU9WxH94LNIq79Grr2SETdYGJy5BWN+L2JiP0QNBMpTQiDIAcnsroOZzVxpXzrUrrcyDBXr3ay8Go+qQdZ6NcaK8obB9xr7LCU0Yr3BwTYDs0Hwh9M2FvUKl9YhDiTneu0Xl49MqXuEsK/srHVpTE9z7wa5227dVg2DN/FL/z0lRSD83otx1jTqiq1PJs0cedBIhdRekbR9AWt4PPsIcZ+Bgsc0sbtzviZ958iuicPH4qzehWu8JDI0dPifEdGkegXL317F6wTJqA1hggCloHrTVuTpc7zRuZB2Em+B8ojDSbJnhZwvbvPIGwV57YT63ZQ62x9ySolnzQB4zTtexkcsZVWEhtZtF0ZRqX4IfNsRVt3kNXnJYCRnBLCr6uYw1kIZ/B0G26Rhtm5cgqOliXkhoWIUX5uKKnfQG2TWwaIhgoydFNHxCXLqYDniBS/ph+ybEXgTtaqB+M63sa6iWScv9wBM5OEir5bGbvS9Bsa/RNQaWoYx3LISRFnkoGSXbEHqM/nNF4kyMfvOf+RGI+BNX//d2BqUP5ZMW7ogq7vfPVLw5XGE3dEeWWr97WFtNRyk+a4UGw5IVp7VfdRPPz3KuutmSe9OzDL5VpGJVI7cgCmwI3owB0Vkmec1czxnutzq4PW5T2U5uoU2M1Az1/rcz7kjfoiIyk0pB+lejT/rnivwVE9WQpruAIufcOnRBQkrxCVs3bUTIM1yiJqFYTB43Jem5Rn8TUh1zQRaJLi98gLMxTKLfa+Ko0WCQ36dtZbdg53wEFAUXNSn4XOcIiFwPaxwNCN4n9ex8g3JXU26u1AufWQ0UuJl/n3C7Pdo6lN+U1n9Sxa8WqTj5XdfNqfHYYtBNPmIeyjDwqqbBwHRbSI38AxhNRAfVtI1hpV0BNypjNAVhWALBOq+5zYToeM9eZCpAZTNc8GQSrEO4nZDAlAbTLTgJh/LUDwsv0Y8KY5nQsrE2lLnDUG1WN9j4m6fmqXUd8lvwOcVUf/RpKNADhxBLMnmnCtN3PQ/DHH33y6qQKxMhQDvlMcgwYAvrSTKyGKudeIZIvmbf+Zq1iDW7EeSEn5/E204xz1XzfoiVYNDggwUxgajvwD+1gblakoHo+4ObuvcPj4SDNr30LaU21lUxNYRgl4sBZFiNrumRog6sZYZ+6HYjhEGb008o0BzSNmqoB6mdRbDCT97oAJdb2yqPowaK2P+l+JWx2jnuP6wAe28I4OHmmC5uPdgbSnQ9A7cQ/tWvBydY7pQB09gYEId5DWXlkZs4mae0beKH1r4xDMFdHRy4TjWGmDFb6vtRK+b8M90SBeg5cRrRzj2Fb00BCehq8m5jr8frQo3KKgi892qyrXNctcnbnynNcWH4gOG+wPD46+vjMOspyPNuDlGnU40TKfO6e5cdcHsiIH7K2syI7zvuXreNN1jkXtpXUe+6G+G7nw3NcsJRBhIDiVirqfcEeSotC913je+sH2gTKRl4Pw+EIyrYJMnCqKsQFExUvBSZ3SdGIIJ9FkrZypvq488s2EmJng8JCBk0SJz6sZ4mGh0Uco6YPxDamWAP6A2+isxsF6EP4PBqkk0RzJuSoukn/kt4jLgciAhdgz2UonSR8Rj6JiCIbQqHbqQ+nnqbbS/uCYOapa5RnPAJX9Iq7S6PD7ja/GLNROHAk/DMEjSdSppL1/Ty+W1KUNCoT4TOMRngWvjLxEFtDHiOFdgc86sjGsPxEzHBYgbs3xEU3v2crugTNkdUbfN/ObwekXkYIV5Yx8bU4OZqKPqJlAESGPn+vvmwUI3L+bI5EP1uyrZAohjD52J58kBLGp9MS7KnH6rnQnd28q+EiEfYdFCqe+o96Ce84lJpKEpOMkIq35sMjE9Urjdvt/ZdhWGwytMI5L+Z83iazM7jeaRSTt7MQdJZpZL9kMgU2V6gjUwWnQ28kkT7qKo8RrjQEsNipwi3xuDShccGI0HHNUIxEMN5JiijipsIJ4UW0b3HekWGsAXQ3mDHOSD2BCC9IiyfalS1rfxDsdxPEccWyTL+vmhTzJuCqwJQCTknt8qwGa8xXrg7aCbN1J5XSkoS9l2ghiLrHbc39fCSbJNbgdMxXeUe/69Skt8STdUTUTtoWR8LSNBpcod//5u+1uKPzW6r7qnnVo8rWkp8557VlStj2tYEM7knxgxsJO/N83Zj8pMS/VLrBwi887wD1ql6Sw25YdA/yM1H3ywp4iUFmhG3KtNJx1XO+yX6GfVJpqH72qJeDxg+5/fNwZwgqj6f11AIlJsUoQZiWjT9PN7tQXTyYOjRJ1YLlnW+dbl1PcvAC5DEsBvVM9jMpBEcK+2qSJa6FTk2PXUQr8SA5jhGvXvBd6C5eDyuSQKUu5FMR9zPVkCN3e4esKszU7ah+ZdIxVWsmv/0IeXAYSnB9jxyUg8YxgkL01ojfXH9lZitFRXy5p2J+FVYbqLUgQgQ==";
    },
    //获取权限对象
    getAuthObject: function () {
        var objAuth;
        if (window.ActiveXObject || "ActiveXObject" in window) //IE
        {
            objAuth = document.getElementById("AuthIE");
        } else if ((navigator.userAgent.indexOf("Chrome") > 0) || (navigator.userAgent.indexOf("Firefox") > 0)) {
            AuthObject = this.AuthObject;
            objAuth = new AuthObject();
        } else {
            objAuth = document.getElementById("AuthNoIE");
        }
        return objAuth;
    },
    AuthObject: function () {
        if (typeof AuthObject._initialized == "undefined") {
            // GetUserNameEx
            AuthObject.prototype.GetUserNameEx = function (scope, authCode) {
                //console.log("enter GetUserNameEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetUserNameEx",
                        "Scope": scope,
                        "AuthCode": authCode
                    }
                }, "*");
                return 0;
            };
            // GetDigestEx
            AuthObject.prototype.GetDigestEx = function (scope, authCode, password, challenge) {
                //console.log("enter GetDigestEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetDigestEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "UserPin": password,
                        "Challenge": challenge
                    }
                }, "*");
                return 0;
            };
            // RegisterUserEx   
            AuthObject.prototype.RegisterUserEx = function (scope, authCode, username, password) {
                //console.log("enter RegisterUserEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "RegisterUserEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "Name": username,
                        "UserPin": password
                    }
                }, "*");
                return 0;
            };
            // ChangeUserPinEx
            AuthObject.prototype.ChangeUserPinEx = function (scope, authCode, oldPassword, newPassword) {
                //console.log("enter ChangeUserPinEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "ChangeUserPinEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "OldPin": oldPassword,
                        "NewPin": newPassword
                    }
                }, "*");
                return 0;
            };
            // SetUserDataEx
            AuthObject.prototype.SetUserDataEx = function (scope, authCode, password, type, offset, data) {
                //console.log("enter SetUserDataEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "SetUserDataEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "UserPin": password,
                        "Type": type,
                        "Offset": offset,
                        "Data": data
                    }
                }, "*");
                return 0;
            };
            // GetUserDataEx
            AuthObject.prototype.GetUserDataEx = function (scope, authCode, type, offset, size) {
                //console.log("enter GetUserDataEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetUserDataEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "Type": type,
                        "Offset": offset,
                        "Size": size
                    }
                }, "*");
                return 0;
            };
            // EnumDog
            AuthObject.prototype.EnumDog = function (authCode) {
                //console.log("enter EnumDog()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "EnumDog",
                        "AuthCode": authCode
                    }
                }, "*");
                return 0;
            };
            AuthObject._initialized = true;
        }
    }
}