namespace MyNote.Desktop.Models
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                client.Dispose();
            }
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtUserName = new System.Windows.Forms.TextBox();
            this.btnListNotes = new System.Windows.Forms.Button();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtApiUrl = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.lstNotes = new System.Windows.Forms.ListBox();
            this.txtNote = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 41);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(58, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Username:";
            // 
            // txtUserName
            // 
            this.txtUserName.Location = new System.Drawing.Point(78, 38);
            this.txtUserName.Name = "txtUserName";
            this.txtUserName.Size = new System.Drawing.Size(143, 20);
            this.txtUserName.TabIndex = 1;
            this.txtUserName.Text = "s@s.com";
            // 
            // btnListNotes
            // 
            this.btnListNotes.Location = new System.Drawing.Point(339, 10);
            this.btnListNotes.Name = "btnListNotes";
            this.btnListNotes.Size = new System.Drawing.Size(104, 23);
            this.btnListNotes.TabIndex = 2;
            this.btnListNotes.Text = "List Notes";
            this.btnListNotes.UseVisualStyleBackColor = true;
            this.btnListNotes.Click += new System.EventHandler(this.btnListNotes_Click);
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(300, 38);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.Size = new System.Drawing.Size(143, 20);
            this.txtPassword.TabIndex = 4;
            this.txtPassword.Text = "xxxxxx";
            this.txtPassword.UseSystemPasswordChar = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(234, 41);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(56, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Password:";
            // 
            // txtApiUrl
            // 
            this.txtApiUrl.Location = new System.Drawing.Point(78, 12);
            this.txtApiUrl.Name = "txtApiUrl";
            this.txtApiUrl.Size = new System.Drawing.Size(255, 20);
            this.txtApiUrl.TabIndex = 6;
            this.txtApiUrl.Text = "https://noteapi.osahin.net/";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(12, 15);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(52, 13);
            this.label3.TabIndex = 5;
            this.label3.Text = "API URL:";
            // 
            // lstNotes
            // 
            this.lstNotes.FormattingEnabled = true;
            this.lstNotes.Location = new System.Drawing.Point(15, 67);
            this.lstNotes.Name = "lstNotes";
            this.lstNotes.Size = new System.Drawing.Size(141, 355);
            this.lstNotes.TabIndex = 7;
            this.lstNotes.SelectedIndexChanged += new System.EventHandler(this.lstNotes_SelectedIndexChanged);
            // 
            // txtNote
            // 
            this.txtNote.Location = new System.Drawing.Point(163, 67);
            this.txtNote.Multiline = true;
            this.txtNote.Name = "txtNote";
            this.txtNote.Size = new System.Drawing.Size(280, 355);
            this.txtNote.TabIndex = 8;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.txtNote);
            this.Controls.Add(this.lstNotes);
            this.Controls.Add(this.txtApiUrl);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtPassword);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.btnListNotes);
            this.Controls.Add(this.txtUserName);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "MyNote v1.0";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtUserName;
        private System.Windows.Forms.Button btnListNotes;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtApiUrl;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ListBox lstNotes;
        private System.Windows.Forms.TextBox txtNote;
    }
}

