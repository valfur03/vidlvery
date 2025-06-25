export type Job = {
  id: string;
  file: {
    name: string;
    path: string;
  };
  initiator: {
    email: string;
  };
};

export type CompletedJob = {
  id: string;
  file: {
    id: string;
    name: string;
    path: string;
  };
  initiator: {
    email: string;
  };
};
