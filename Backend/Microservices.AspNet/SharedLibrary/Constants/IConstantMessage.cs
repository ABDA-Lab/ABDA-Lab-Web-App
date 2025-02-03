using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Constants
{
    public interface IConstantMessage
    {
        public static string USER_INFORMATION_NOT_FOUND = "User information not found";
        public static string MISSING_USER_ID = "Missing user id";
        public static string INTERNAL_SERVER_ERROR = "Internal server error";
        public static string INTERNAL_SERVER_MEDIATOR_ERROR = "Internal server mediator error";
        public static string GET_ME_SUCCESS =  "Get me success";
        public static string GET_ME_FALSE =  "Get me false";


    
    }
}