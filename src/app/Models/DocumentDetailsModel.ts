export class DocumentDetailsModel {
  public DocumentDetailsID: number = 0;  // pk
  public DocumentMasterID: number = 0;  // fk
  public TransactionID: number = 0;  // other inserted table pk
  public TableName: string = '';
  public ColumnName: string = '';
  public DisplayColumnNameEn: string = '';
  public DisplayColumnNameHi: string = '';
  public FolderName: string = '';
  public FileName: string = '';
  public Dis_FileName: string = '';
  public ModifyBy: number = 0;
  public IsMandatory: boolean = false;
  public FileExtention: string = '';
  public MinFileSize: string = '';
  public MaxFileSize: string = '';
  public SortOrder: number = 0;
  public GroupNo: number = 0;
  public Remark?: string = ''
  // for handling old
  public OldFilePath: string = ''
}


export interface DocumentVerification {
  documentName: string;
  isAccepted: boolean;
  reason: string;
  remarks: string;
}

export interface ApplicationVerification {
  //applicationNo: string;
  //applicantName: string;
  documents: DocumentVerification[];
  commonRemarks: string;
  action: string;
}
